# frozen_string_literal: true

module Api
  module V1
    class BarcodesController < ApplicationController
      def index
        barcode = Barcode.new(barcode_params)

        if barcode.valid?
          render json: { result: barcode.isbn13_with_check_digit }, status: :ok
        else
          render json: { error: barcode.errors.objects.first.full_message }, status: :ok
        end
      end

      private

      def barcode_params
        params.permit(
          :type,
          :isbn
        )
      end
    end
  end
end
