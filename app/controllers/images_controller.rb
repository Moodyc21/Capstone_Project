class ImagesController < ApplicationController
    before_action :authenticate_user!
      
    def index
      @image = Image.where(params[:id])
  
      render json: @image
    end
  
    def show
      @image = Image.find(params[:id])
  
      render json: @image
    end
  
    def create
    @image = Image.create(image_params)
        render json: @image
    #   if @image.save
    #     render json: @image, status: :created, location: @image
    #   else
    #     render json: @image.errors, status: :unprocessable_entity
    #   end
    end
  
    def update
      @image = Image.find(params[:id])
  
  
      if @image.update(image_params)
        render json: @image
      else
        render json: @image.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @image = Image.find(params[:id]).delete
  
      render status: :ok
    end
  
    private
  
    def image_params
      params.require(:image).permit(:items, :link, :board_id)
    end
  end