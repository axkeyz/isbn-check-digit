# frozen_string_literal: true

module BarcodesCalculator
  extend ActiveSupport::Concern

  def get_isbn13_with_check_digit(isbn13)
    isbn13 + get_isbn13_check_digit(isbn13).to_s
  end

  def get_isbn13_check_digit(isbn13)
    digits = isbn13.split('')

    sum = get_isbn13_alternative_sum(digits)
    get_mod10_remainder(sum)
  end

  def get_isbn13_alternative_sum(digits)
    sum = 0

    digits.each_with_index do |digit, index|
      digit = digit.to_i

      sum += if (index % 2).equal? 0
               digit
             else
               3 * digit
             end
    end

    sum
  end

  def get_mod10_remainder(integer)
    (10 - (integer % 10)) % 10
  end
end
