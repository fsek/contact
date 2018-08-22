class CreateUserKeys < ActiveRecord::Migration[5.1]
  def change
    create_table :user_keys do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.references :conversation, foreign_key: true, index: true, null: false, unique: true
      t.binary :encrypted_key, null: false

      t.timestamps
    end
  end
end
