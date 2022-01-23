# == Schema Information
#
# Table name: remote_accounts
#
#  id                   :bigint(8)        not null, primary key
#  account_id           :bigint(8)        not null
#  token                :string
#  origin               :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  remote_account_id    :string
#  remote_account_login :string
#
class RemoteAccount < ApplicationRecord
  belongs_to :account
end
