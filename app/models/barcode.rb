# frozen_string_literal: true

class Barcode
  include ActiveModel::API
  include BarcodesCalculator

  attr_accessor :type, :isbn

  validates :type, :isbn, presence: true
  validates :type, inclusion: { in: ['isbn13'], message: 'not supported yet' }

  validates :isbn, numericality: { only_integer: true }
  validates :isbn, length: { is: 12 }, if: :type == 'isbn13'

  def isbn13_with_check_digit
    get_isbn13_with_check_digit(isbn)
  end
end
