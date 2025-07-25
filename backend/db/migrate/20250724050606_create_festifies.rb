class CreateFestifies < ActiveRecord::Migration[8.0]
  def change
    create_table :festifies do |t|
      t.string :image1
      t.string :image2
      t.string :image3
      t.string :title
      t.text :description
      t.string :creator
      t.string :department
      t.integer :grade
      t.string :place_text
      t.string :place_image

      t.timestamps
    end
  end
end
