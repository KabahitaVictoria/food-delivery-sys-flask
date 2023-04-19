"""remove unique constraint

Revision ID: 226bd130dfbd
Revises: c078b9f99cbd
Create Date: 2023-04-18 19:31:59.477349

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '226bd130dfbd'
down_revision = 'c078b9f99cbd'
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