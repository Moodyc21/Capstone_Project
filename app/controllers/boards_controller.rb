class BoardsController < ApplicationController

        before_action :authenticate_user!
      
        def index
          @boards = current_user.boards
      
          render json: @boards
        end
      
        def show
          @board = Board.find(params[:id])
      
          render json: @board
        end
      
        def create
          @user = current_user
          @board = @user.boards.build(post_params)
      
          if @user.save
            render json: @board, status: :created, location: @board
          else
            render json: @board.errors, status: :unprocessable_entity
          end
        end
      
        def update
          @board = Board.find(params[:id])
      
      
          if @board.update(post_params)
            render json: @board
          else
            render json: @board.errors, status: :unprocessable_entity
          end
        end
      
        def destroy
          @board = Board.find(params[:id]).delete
      
          render status: :ok
        end
      
        private
      
        def board_params
          params.require(:board).permit(:name, :year, :completed)
        end
      end
