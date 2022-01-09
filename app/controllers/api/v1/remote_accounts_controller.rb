class Api::V1::RemoteAccountsController < Api::BaseController

    def index
        render json: current_account.remote_accounts
    end

end
