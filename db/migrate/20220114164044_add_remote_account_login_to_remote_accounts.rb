class AddRemoteAccountLoginToRemoteAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :remote_accounts, :remote_account_login, :string
  end
end
