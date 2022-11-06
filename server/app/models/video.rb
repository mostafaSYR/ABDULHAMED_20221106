class Video < ApplicationRecord
  belongs_to :category

  has_one_attached :file
  has_one_attached :thumbnail

  validates :title, presence: true
  def file_url
    Rails.application.routes.url_helpers.url_for(file) if file.attached?
  end

  def category_name
    category.name
  end

  def thumbnail_url
    Rails.application.routes.url_helpers.url_for(thumbnail) if thumbnail.attached?
  end

  def generate_thumbnail
    img = file.preview(resize_to_limit: [256, 256]).blob
    self.thumbnail.attach(io: StringIO.new(img.download), filename: 'thumbnail.jpg', content_type: 'image/jpg')
  end
end
