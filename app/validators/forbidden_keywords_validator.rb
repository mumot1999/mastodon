# frozen_string_literal: true

class ForbiddenKeywordsValidator < ActiveModel::Validator
  def validate(status)
    @status = status
    if check_keywords
      status.errors.add(:text, I18n.t('statuses.forbbiden_keywords', tags: tags.join(', '), count: tags.size))
    end
  end

  private

  def check_keywords
    txt = @status.text
    txt.downcase!

    @forbidden_keywords.any? { |fk| txt.include? fk }
  end

  def forbidden_keywords
    return @forbidden_keywords if @forbidden_keywords

    @forbidden_keywords = Setting.forbbiden_keywords.nil? ? [] : Setting.forbidden_keywords
    @forbidden_keywords = @forbidden_keywords.split(' ') if @forbidden_keywords.is_a? String
    @forbidden_keywords = @forbidden_keywords.map(&:downcase)
  end
end
