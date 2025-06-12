from flask import request, jsonify, Blueprint
from .db_config import get_connection

task_bp = Blueprint('task', __name__)

@task_bp.route('/get-tasks', methods=['GET'])
def get_tasks():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            id,
            user_id,
            title,
            description,
            DATE_FORMAT(created_at, '%a, %d %b %Y') AS created_at,
            DATE_FORMAT(due_date, '%a, %d %b %Y') AS due_date,
            priority,
            status,
            category
        FROM tasks
    """)
    
    columns = [desc[0] for desc in cursor.description]
    tasks = [dict(zip(columns, row)) for row in cursor.fetchall()]

    cursor.close()
    conn.close()

    return jsonify({"tasks": tasks}), 200

@task_bp.route('/total-tasks', methods=['GET'])
def total_tasks():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT status, COUNT(*) 
        FROM tasks
        GROUP BY status
    """)
    rows = cursor.fetchall()

    # Initialize counts for all statuses with 0
    counts = {
        "Available": 0,
        "Ongoing": 0,
        "In Review": 0,
        "Revision": 0,
        "Completed": 0,
    }
    
    total = 0

    for status, count in rows:
        counts[status] = count
        total += count

    cursor.close()
    conn.close()

    # Include total count
    counts["Total"] = total

    return jsonify(counts), 200

