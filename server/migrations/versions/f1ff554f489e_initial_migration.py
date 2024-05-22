"""
Initial migration

Revision ID: f1ff554f489e
Revises: 
Create Date: 2024-05-13 20:31:55.841199
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1ff554f489e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Check if the column already exists before adding
    bind = op.get_bind()
    existing_columns = [col[1] for col in bind.execute(sa.text("PRAGMA table_info(animals)")).fetchall()]
    
    if 'quantity' not in existing_columns:
        with op.batch_alter_table('animals', schema=None) as batch_op:
            batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=False))

def downgrade():
    with op.batch_alter_table('animals', schema=None) as batch_op:
        batch_op.drop_column('quantity')
