class AddLinkToImages < ActiveRecord::Migration[5.1]
  def change
    add_column :images, :link, :string
  end
end
