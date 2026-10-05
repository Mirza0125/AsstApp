import {
  POST_DESIGNER_REQUEST,
  POST_DESIGNER_SUCCESS,
  POST_DESIGNER_FAILURE,
} from "./type"

// POST Designer actions
export const postDesignerRequest = data => ({
  type: POST_DESIGNER_REQUEST,
  data
})

export const postDesignerSuccess = data => ({
  type: POST_DESIGNER_SUCCESS,
  data
})

export const postDesignerFailure = data => ({
  type: POST_DESIGNER_FAILURE,
  data
})
