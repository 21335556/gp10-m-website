const router = {
  renderView() {
    let hash = location.hash;
    // console.log(hash);
    switch(hash) {
      case '#position':
        $('main').html('positoin')
        break;
      case '#search':
        $('main').html('search')
        break;
      case '#profile':
        $('main').html('profile')
        break;
    }
  },

  init() {
    window.addEventListener('load',this.renderView)
    window.addEventListener('hashchange',this.renderView)
  }
}

export {
  router
}