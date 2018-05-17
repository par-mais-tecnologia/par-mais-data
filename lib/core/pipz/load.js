import AsyncProcess from '../../utils/asyncProcess/index'

const getSubDocument = x => x.document || x.contentDocument || x.contentWindow.document

const getIframeDoc = () => {
  const ap = new AsyncProcess('Document')
  ap.set((resolve) => {
    const fr = document.all['pipz-chat']
    if (fr !== undefined) {
      const doc = getSubDocument(fr)
      const dc = doc.getElementsByTagName('container')
      if (dc.length > 0) {
        resolve({
          frame: fr,
          document: doc,
          window: fr.contentWindow
        })
      }
    }
  })
  return ap.runPromise()
}

const getAngularElement = (doc) => {
  const ap = new AsyncProcess('Angular')
  ap.set((resolve) => {
    if (doc.window.angular !== undefined) {
      resolve({
        ...doc,
        angular: doc.window.angular
      })
    }
  })
  return ap.runPromise()
}

const getScope = (doc) => {
  const ap = new AsyncProcess('Containers')
  ap.set((resolve) => {
    const htmlEl = doc.document.getElementsByTagName('container')
    const el = doc.angular.element(htmlEl)

    if (el.scope() !== undefined) {
      resolve({
        ...doc,
        scope: el.scope(),
        angularElement: el,
        element: htmlEl
      })
    }
  })
  return ap.runPromise()
}

const load = () =>
  getIframeDoc()
    .then(getAngularElement)
    .then(getScope)
    .catch((err) => {
      console.log(err)
    })

export default load
