class ChangeImageColumnsToText < ActiveRecord::Migration[8.0]
  def change
    change_column :festifies, :image1, :text
    change_column :festifies, :image2, :text
    change_column :festifies, :image3, :text
    change_column :festifies, :place_image, :text
  end
end
