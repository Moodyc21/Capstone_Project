class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :title
      t.string :url
      t.string :description
      t.references :board, foreign_key: true

      t.timestamps
    end
  end
end
