class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.references :category, null: false, foreign_key: true

      t.string :title
      t.timestamps
    end
  end
end
