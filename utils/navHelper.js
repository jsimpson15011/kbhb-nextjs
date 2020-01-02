export const parseNavItems = navItems => {
  return navItems.navItems.map(navItem => {
      let navItemInfo = {
        label: navItem.title,
        type: navItem.type,
        childItems: navItem.child_items ?
          navItem.child_items.map(childItem => {
            const parentSlug = childItem.object === 'page' || childItem.object === 'custom' ?
              ''
              : '/' + navItem.slug
            return Object.assign({}, childItem, {parentSlug: parentSlug})
          })
          : null
      }
      if (navItem.type === 'custom') {
        navItemInfo.key = navItem.url
        navItemInfo.href = navItem.url
      } else {
        navItemInfo.key = navItem.slug
        navItemInfo.href = '/' + navItem.slug
      }
      return (
        navItemInfo
      )
    }
  )
}