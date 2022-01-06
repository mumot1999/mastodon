class AddRemoteAccountIdToRemoteAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :remote_accounts, :remote_account_id, :string
  end
end
