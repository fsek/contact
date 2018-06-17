module MessageService
  def self.new_conversation(user, plaintext)
    # Generate a random password and encrypt the message
    password = CryptoService.random_password
    data = CryptoService.symmetric_encrypt(password, plaintext)

    ActiveRecord::Base.transaction do
      # Create the conversation
      conversation = Conversation.create!

      # Create a new anonymous user and encrypt the random password for it
      anon_user = AnonUser.create!(conversation: conversation, conversation_key: password)

      # Save the encrypted message
      Message.create!(ciphertext: data[:ciphertext],
                      salt: data[:salt],
                      iv: data[:iv],
                      anon_user: anon_user,
                      conversation: conversation)

      # Encrypt the random password for the user
      UserKey.create!(user: user, conversation: conversation, key: password)

      # Return the reference and password link to the anonymous user
      { reference: anon_user.reference, password: anon_user.password }

      # TODO: Notify the user that a new message is available (via email)
    end
  end

  def self.user_add_message(user, conversation, plaintext, private_key)
    # Extract and decrypt the symmetric password
    encrypted_password = UserKey.find_by!(conversation: conversation, user: user).encrypted_key
    password = CryptoService.private_decrypt(private_key, encrypted_password)

    # Encrypt and save the new message
    data = CryptoService.symmetric_encrypt(password, plaintext)
    Message.create!(ciphertext: data[:ciphertext],
                    salt: data[:salt],
                    iv: data[:iv],
                    user: user,
                    conversation: conversation)
  end

  def self.anon_add_message(anon_user, conversation, plaintext, private_key)
    # Extract and decrypt the symmetric password
    password = CryptoService.private_decrypt(private_key, anon_user.encrypted_conversation_key)

    # Encrypt and save the new message
    data = CryptoService.symmetric_encrypt(password, plaintext)
    Message.create!(ciphertext: data[:ciphertext],
                    salt: data[:salt],
                    iv: data[:iv],
                    anon_user: anon_user,
                    conversation: conversation)

      # TODO: Notify the user that a new message is available (via email)
  end

  def self.get_messages_for_user(user, conversation, private_key)
    # Extract and decrypt the symmetric password
    encrypted_password = UserKey.find_by!(conversation: conversation, user: user).encrypted_key
    password = CryptoService.private_decrypt(private_key, encrypted_password)

    # Decrypt all the messages
    get_messages(conversation, password)
  end

  def self.get_messages_for_anon(anon_user, conversation, externalPassword)
    # Decrypt the anon_user private key
    private_key = CryptoService.symmetric_decrypt(externalPassword, anon_user.private_key_salt, anon_user.private_key_iv, anon_user.encrypted_private_key)

    puts(private_key)

    # Extract and decrypt the symmetric conversation password
    password = CryptoService.private_decrypt(private_key, anon_user.encrypted_conversation_key)

    # Decrypt all the messages
    get_messages(conversation, password)
  end

  private

  def self.get_messages(conversation, password)
    conversation.messages.map do |message|
      CryptoService.symmetric_decrypt(password, message.salt, message.iv, message.ciphertext)
    end
  end
end
