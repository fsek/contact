class CreateAnonUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :anon_users do |t|
      t.string :reference, null: false, index: true, unique: true
      t.binary :public_key, null: false
      t.binary :encrypted_private_key, null: false
      t.binary :private_key_salt, null: false
      t.binary :private_key_iv, null: false
      t.binary :encrypted_conversation_key, null: false
      t.references :conversation, foreign_key: true, index: true, null: false, unique: true

      t.timestamps
    end
  end
end
