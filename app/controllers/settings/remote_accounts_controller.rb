# frozen_string_literal: true
class Settings::RemoteAccountsController < Settings::BaseController
  before_action :set_account

  def index
    @accounts = @account.remote_accounts.order(id: :asc).page(params[:page]).per(10)
    @account.build_fields
  end

  def update
    if UpdateAccountService.new.call(@account, account_params)
      ActivityPub::UpdateDistributionWorker.perform_async(@account.id)
      redirect_to settings_profile_path, notice: I18n.t('generic.changes_saved_msg')
    else
      @account.build_fields
      render :show
    end
  end

  def create
    remote_account_data = params[:remote_account].permit(:token, :origin)
    response = RemoteAccountClientService.new('https://' + remote_account_data[:origin], remote_account_data[:token]).call(api_v1_accounts_verify_credentials_path, :get)

    if response['id'].present?
      remote_account_data['remote_account_id'] = response['id']
      remote_account_data['remote_account_login'] = response['acct']

      @account.remote_accounts.new(remote_account_data).save
    end
    redirect_to settings_remote_accounts_path
  end

  def destroy
    @account.remote_accounts.find(params[:id]).destroy
    redirect_to settings_remote_accounts_path
  end

  private

  def account_params
    params.require(:account).permit(:display_name, :note, :avatar, :header, :locked, :bot, :discoverable, fields_attributes: [:name, :value])
  end

  def set_account
    @account = current_account
  end
end
