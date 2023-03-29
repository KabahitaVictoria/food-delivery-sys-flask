"""empty message

Revision ID: 454b585c243d
Revises: fd950bd3d0d3
Create Date: 2023-03-27 15:23:58.768118

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '454b585c243d'
down_revision = 'fd950bd3d0d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('addresses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_name', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('addresses', schema=None) as batch_op:
        batch_op.drop_column('user_name')

    # ### end Alembic commands ###