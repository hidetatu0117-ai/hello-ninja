"""
データの保存先はSQLite（1つのファイル data.db）です。
将来Instagram以外のSNSを追加しても同じ posts / post_metrics テーブルを
使い回せるよう、platform列で区別する設計にしています。
"""

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "data.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            platform TEXT NOT NULL,
            posted_at TEXT,
            permalink TEXT,
            media_type TEXT,
            caption TEXT,
            thumbnail_url TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS post_metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id TEXT NOT NULL,
            captured_at TEXT NOT NULL,
            reach INTEGER,
            likes INTEGER,
            comments INTEGER,
            saved INTEGER,
            shares INTEGER,
            plays INTEGER,
            UNIQUE(post_id, captured_at)
        );
        """
    )
    conn.commit()
    conn.close()


def upsert_post(post: dict):
    conn = get_connection()
    conn.execute(
        """
        INSERT INTO posts (id, platform, posted_at, permalink, media_type, caption, thumbnail_url)
        VALUES (:id, :platform, :posted_at, :permalink, :media_type, :caption, :thumbnail_url)
        ON CONFLICT(id) DO UPDATE SET
            posted_at=excluded.posted_at,
            permalink=excluded.permalink,
            media_type=excluded.media_type,
            caption=excluded.caption,
            thumbnail_url=excluded.thumbnail_url
        """,
        post,
    )
    conn.commit()
    conn.close()


def insert_metrics(post_id: str, captured_at: str, metrics: dict):
    conn = get_connection()
    conn.execute(
        """
        INSERT OR REPLACE INTO post_metrics
            (post_id, captured_at, reach, likes, comments, saved, shares, plays)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            post_id,
            captured_at,
            metrics.get("reach"),
            metrics.get("likes"),
            metrics.get("comments"),
            metrics.get("saved"),
            metrics.get("shares"),
            metrics.get("plays"),
        ),
    )
    conn.commit()
    conn.close()


def latest_posts_with_metrics(platform: str = "instagram", limit: int = 25):
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT
            p.id, p.platform, p.posted_at, p.permalink, p.media_type,
            p.caption, p.thumbnail_url,
            m.captured_at, m.reach, m.likes, m.comments, m.saved, m.shares, m.plays
        FROM posts p
        LEFT JOIN post_metrics m
            ON m.post_id = p.id
            AND m.captured_at = (
                SELECT MAX(captured_at) FROM post_metrics WHERE post_id = p.id
            )
        WHERE p.platform = ?
        ORDER BY p.posted_at DESC
        LIMIT ?
        """,
        (platform, limit),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]
