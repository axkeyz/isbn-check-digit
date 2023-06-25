# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class BarcodesControllerTest < ActionDispatch::IntegrationTest
      test 'should get the correct result' do
        get(api_v1_barcodes_url, params: { type: 'isbn13', isbn: '777211843793' })

        assert_response :success

        json = JSON.parse(response.body)
        assert_equal '7772118437933', json['result']
      end

      test 'invalid if missing params' do
        get(api_v1_barcodes_url)
        assert_response :success

        get(api_v1_barcodes_url, params: { type: 'isbn13' })
        assert_response :success

        get(api_v1_barcodes_url, params: { isbn: '777211843793' })
        assert_response :success
      end

      test 'invalid if data is not in the right format' do
        get(api_v1_barcodes_url, params: { type: 'isbn13', isbn: '7772118437933' })
        assert_response :success

        get(api_v1_barcodes_url, params: { type: 'isbn13', isbn: '77721184379' })
        assert_response :success

        get(api_v1_barcodes_url, params: { type: 'isbn13', isbn: '77721-84x793' })
        assert_response :success

        get(api_v1_barcodes_url, params: { type: 'isbn13', isbn: '77721 843793' })
        assert_response :success

        get(api_v1_barcodes_url, params: { type: 'isbn10', isbn: '777211843793' })
        assert_response :success
      end
    end
  end
end
