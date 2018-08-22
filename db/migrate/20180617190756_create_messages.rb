class CreateMessages < ActiveRecord::Migration[5.1]
  def up
    create_table :messages do |t|
      t.binary :ciphertext, null: false
      t.binary :iv, null: false
      t.binary :salt, null: false
      t.references :user, foreign_key: true, index: true
      t.references :anon_user, foreign_key: true, index: true
      t.references :conversation, foreign_key: true, index: true, null: false

      t.timestamps
    end

    execute "ALTER TABLE messages ADD CONSTRAINT only_belongs_to_one CHECK (user_id IS NULL OR anon_user_id IS NULL);"
  end

  def down
    drop_table :messages
  end
end
