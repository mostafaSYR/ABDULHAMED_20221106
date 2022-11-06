class VideosController < ApplicationController

  # GET /videos
  def index
    @videos = Video.all

    render json: @videos.to_json( methods: [:file_url, :category_name, :thumbnail_url])
  end

  def create
    @video = Video.new(video_params)
    if @video.save
      @video.generate_thumbnail
      render json: @video
    else
      render json: { errors: @video.errors }, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.permit(:title, :file, :category_id)
  end

end
