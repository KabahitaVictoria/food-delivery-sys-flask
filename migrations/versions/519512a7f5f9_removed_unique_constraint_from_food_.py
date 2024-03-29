"""removed unique constraint from food item model

Revision ID: 519512a7f5f9
Revises: a8afb61b0012
Create Date: 2023-04-17 20:13:49.325468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '519512a7f5f9'
down_revision = 'a8afb61b0012'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('food_items', schema=None) as batch_op:
        batch_op.drop_constraint('food_items_category_name_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('food_items', schema=None) as batch_op:
        batch_op.create_unique_constraint('food_items_category_name_key', ['category_name'])

    # ### end Alembic commands ###
