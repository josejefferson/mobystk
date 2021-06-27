angular.module('ngRightClick', [])
angular.module('ngRightClick').directive('ngRightClick', $parse => {
	return (scope, el, attrs) => {
		const fn = $parse(attrs.ngRightClick)
		el.bind('contextmenu', (e) => {
			scope.$apply(() => {
				e.preventDefault()
				fn(scope, { $event: e })
			})
		})
	}
})