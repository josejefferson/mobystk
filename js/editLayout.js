angular.module('joystick', []).controller('editLayoutCtrl', ['$scope', ($scope) => {
	Lockr.prefix = 'joystick.'
	$scope.layouts = Lockr.smembers('layouts')
	$scope.fullscreen = false
	$scope.nowEditing = null
	$scope.viewGroup = null
	$scope.viewButton = null
	$scope.openGroup = false
	$scope.openButton = false
	$scope.setGroup = group => {
		$scope.openGroup = false
		if (!group) return
		$scope.openGroup = true
		$scope.viewGroup = group
	}
	$scope.setButton = button => {
		$scope.openButton = false
		if (!button) return
		$scope.openButton = true
		$scope.viewButton = button
	}
	$scope.layout = newLayout()

	$scope.isGroup = e => !!e.group
	$scope.setNowEditing = (key) => {
		$scope.nowEditing = $scope.openButton ? $scope.viewButton : $scope.openGroup ? $scope.viewGroup : $scope.layout
		$scope.nowEditingKey = key
	}

	$scope.btnStyle = (button) => {
		return {
			...(button.anchorX === 'center' ? {
				left: '50%',
				transform: 'translateX(-50%)'
			} : {
				[button.anchorX]: button.x.join('')
			}),
			...(button.anchorY === 'center' ? {
				top: '50%',
				transform: 'translateY(-50%)'
			} : {
				[button.anchorY]: button.y.join('')
			}),
			...(button.anchorX === 'center' && button.anchorY === 'center' && {
				transform: 'translate(-50%, -50%)'
			}),
			width: button.width.join(''),
			height: button.height.join(''),
			fontSize: button.fontSize.join(''),
			borderRadius: button.rounded ? '50%' : button.borderRadius.map(b => b.join('')).join(' '),
			borderTop: button.hiddenBorders.top ? 'none' : 'auto',
			borderBottom: button.hiddenBorders.bottom ? 'none' : 'auto',
			borderLeft: button.hiddenBorders.left ? 'none' : 'auto',
			borderRight: button.hiddenBorders.auto ? 'none' : 'auto',
			...(!button.visible && {
				opacity: 0.25
			})
			// lock
		}
	}

	$scope.grpStyle = (group) => {
		return {
			...(group.anchorX === 'center' ? {
				left: '50%',
				transform: 'translateX(-50%)'
			} : {
				[group.anchorX]: group.x.join('')
			}),
			...(group.anchorY === 'center' ? {
				top: '50%',
				transform: 'translateY(-50%)'
			} : {
				[group.anchorY]: group.y.join('')
			}),
			...(group.anchorX === 'center' && group.anchorY === 'center' && {
				transform: 'translate(-50%, -50%)'
			}),
			width: group.width.join(''),
			height: group.height.join(''),
		}
	}

	$scope.add = (group = false, parent) => {
		if ($scope.openGroup) parent = $scope.viewGroup.buttons
		else parent = $scope.layout.data

		if (group) {
			parent.push(newGroup())
			$scope.viewGroup = parent[parent.length - 1]
			$scope.openGroup = true
		} else {
			parent.push(newButton())
			$scope.viewButton = parent[parent.length - 1]
			$scope.openButton = true
		}
	}

	$scope.remove = (item, parent) => {
		if ($scope.openButton) item = $scope.viewButton
		else if ($scope.openGroup) item = $scope.viewGroup
		parent = $scope.layout.data
		if ($scope.openGroup && $scope.openButton) parent = $scope.viewGroup.buttons

		if (confirm('Are you sure?')) {
			const i = parent.indexOf(item)
			if (i > -1) parent.splice(i, 1)
			if ($scope.openButton && $scope.openGroup) $scope.openButton = false
			else if ($scope.openButton) $scope.openButton = false
			else if ($scope.openGroup) $scope.openGroup = false
		}
	}

	$scope.move = (obj, dir) => {
		if (dir === 'left' || dir === 'right' && obj.anchorX === 'center') return
		if (dir === 'up' || dir === 'down' && obj.anchorY === 'center') return
		switch (dir) {
			case 'up': obj.anchorY === 'top' ? obj.y[0] -= 2 : obj.y[0] += 2
			case 'down': obj.anchorY === 'top' ? obj.y[0] += 2 : obj.y[0] -= 2
			case 'left': obj.anchorX === 'left' ? obj.x[0] -= 2 : obj.x[0] += 2
			case 'right': obj.anchorX === 'left' ? obj.x[0] += 2 : obj.x[0] -= 2
		}
	}

	$scope.edit = async (obj, prop) => {
		const { value } = await Swal.fire({
			title: 'Edit',
			input: 'text',
			inputLabel: '',
			inputValue: obj[prop]
		})
		obj[prop] = value
		$scope.$apply()
	}
}])