class UpdateUsers < ActiveRecord::Migration[5.1]
  def change
    add_column(:users, :public_key, :binary, null: false)
    add_column(:users, :encrypted_private_key, :binary, null: false)
    add_column(:users, :private_key_salt, :binary, null: false)
    add_column(:users, :private_key_iv, :binary, null: false)
  end
end
