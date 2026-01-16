class AddVisitorFeaturesToFestifies < ActiveRecord::Migration[8.0]
  def change
    add_column :festifies, :likes, :integer
    add_column :festifies, :map_x, :integer
    add_column :festifies, :map_y, :integer
  end
end
