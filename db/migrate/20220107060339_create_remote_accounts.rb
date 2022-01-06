class CreateRemoteAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :remote_accounts do |t|
      t.references :account, null: false, foreign_key: true
      t.string :token
      t.string :origin

      t.timestamps
    end
  end
end
