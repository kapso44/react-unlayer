import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as templateActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function templateAddRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/templates', transformRequest(params))
        .then(res => {
          dispatch(templateActions.add(transformResponse(res.data)))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

export function templateUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.patch(`templates/${params.id}`, transformRequest(params))
        .then(res => {
          dispatch(templateActions.add(transformResponse(res.data)))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

export function templateRemoveRequest(id) {
  return dispatch => {
    Http.delete(`templates/${id}`)
      .then(() => {
        dispatch(templateActions.remove(id))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function templateListRequest({pageNumber = 1, url = '/templates'}) {
  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }
    Http.get(url)
      .then((res) => {
        dispatch(templateActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function templateEditRequest(id) {
  return dispatch => {
    Http.get(`templates/${id}`)
      .then((res) => {
        dispatch(templateActions.add(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function templateFetchRequest(slug) {
  return dispatch => {
    Http.get(`templates/published/${slug}`)
      .then((res) => {
        dispatch(templateActions.add(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}