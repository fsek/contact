# Be sure to restart your server when you modify this file.

# Configure sensitive parameters which will be filtered from the log file.
Rails.application.config.filter_parameters += [
  :password,
  :password_confirmation,
  :plaintext,
  :content,
  :private_key,
  :keys,
  :symmetric_output,
  :conversation_key,
  :password_confirmation,
  :encrypted_data,
  :key,
  :cipher,
  :externalPassword,
  :private_key_password,
  :messages,
  :message
]
