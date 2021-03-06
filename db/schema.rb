# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180617192738) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "anon_users", force: :cascade do |t|
    t.string "reference", null: false
    t.binary "public_key", null: false
    t.binary "encrypted_private_key", null: false
    t.binary "private_key_salt", null: false
    t.binary "private_key_iv", null: false
    t.binary "encrypted_conversation_key", null: false
    t.bigint "conversation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_anon_users_on_conversation_id"
    t.index ["reference"], name: "index_anon_users_on_reference"
  end

  create_table "conversations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.binary "ciphertext", null: false
    t.binary "iv", null: false
    t.binary "salt", null: false
    t.bigint "user_id"
    t.bigint "anon_user_id"
    t.bigint "conversation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["anon_user_id"], name: "index_messages_on_anon_user_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "user_keys", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "conversation_id", null: false
    t.binary "encrypted_key", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_user_keys_on_conversation_id"
    t.index ["user_id"], name: "index_user_keys_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.binary "public_key", null: false
    t.binary "encrypted_private_key", null: false
    t.binary "private_key_salt", null: false
    t.binary "private_key_iv", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "anon_users", "conversations"
  add_foreign_key "messages", "anon_users"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users"
  add_foreign_key "user_keys", "conversations"
  add_foreign_key "user_keys", "users"
end
