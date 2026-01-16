class AddRoleAndDetailsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :role, :string
    add_column :users, :department, :string
    add_column :users, :grade, :integer
  end
end
