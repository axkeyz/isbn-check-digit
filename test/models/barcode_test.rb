# frozen_string_literal: true

require 'test_helper'

class BarcodeTest < ActiveSupport::TestCase
  test 'valid if params are formatted for isbn13' do
    barcode = Barcode.new({ type: 'isbn13', isbn: '234789876453' })
    assert_not barcode.invalid?
    assert_equal '2347898764538', barcode.isbn13_with_check_digit

    barcode = Barcode.new({ type: 'isbn13', isbn: '978316148410' })
    assert_not barcode.invalid?
    assert_equal '9783161484100', barcode.isbn13_with_check_digit
  end

  test 'invalid if missing parameters' do
    barcode = Barcode.new({ isbn: '978014300723' })
    assert_not barcode.valid?

    barcode = Barcode.new({ type: 'isbn13' })
    assert_not barcode.valid?
  end

  test 'invalid if isbn is wrong length' do
    barcode = Barcode.new({ type: 'isbn13', isbn: '7772118437933' })
    assert_not barcode.valid?
    assert barcode.errors.of_kind? :isbn, :wrong_length

    barcode = Barcode.new({ type: 'isbn13', isbn: '77721184379' })
    assert_not barcode.valid?
    assert barcode.errors.of_kind? :isbn, :wrong_length
  end

  test 'invalid if parameters are not in the right format' do
    barcode = Barcode.new({ type: 'isbn13', isbn: '77721-84x793' })
    assert_not barcode.valid?
    assert barcode.errors.of_kind? :isbn, :not_a_number

    barcode = Barcode.new({ type: 'isbn13', isbn: '77721 843793' })
    assert_not barcode.valid?
    assert barcode.errors.of_kind? :isbn, :not_a_number
  end

  test 'invalid if wrong type' do
    barcode = Barcode.new({ type: 'isbn10', isbn: '777211843793' })
    assert_not barcode.valid?
    assert barcode.errors.of_kind? :type, :inclusion

    barcode = Barcode.new({ type: 'something random', isbn: '777211843793' })
    assert_not barcode.valid?
    assert barcode.errors.of_kind? :type, :inclusion
  end
end
