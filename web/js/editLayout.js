angular.module('joystick', ['ngRightClick']).controller('editLayoutCtrl', ['$scope', async ($scope) => {
	Lockr.prefix = 'joystick.'
	$scope.layouts = Lockr.smembers('layouts')
	$scope.fullscreen = false
	$scope.nowEditing = null
	$scope.nowEditingKey = null
	$scope.viewGroup = null
	$scope.viewButton = null
	$scope.openGroup = false
	$scope.openButton = false
	$scope.setGroup = group => {
		$scope.openGroup = false
		$scope.nowEditing = group
		if (!group) {
			$scope.nowEditingKey = null
			return
		}
		$scope.setNowEditing('grpDetails', group)
		$scope.openGroup = true
		$scope.viewGroup = group
	}
	$scope.setButton = button => {
		$scope.openButton = false
		$scope.nowEditing = button
		if (!button) {
			$scope.nowEditingKey = null
			return
		}
		$scope.setNowEditing('btnDetails', button)
		$scope.openButton = true
		$scope.viewButton = button
	}
	$scope.layout = await newLayout()

	$scope.isGroup = e => !!e.group
	$scope.setNowEditing = (key, obj) => {
		if (obj) $scope.nowEditing = obj
		else $scope.nowEditing = $scope.openButton ? $scope.viewButton : $scope.openGroup ? $scope.viewGroup : $scope.layout
		$scope.nowEditingKey = key
	}

	$scope.fllscr = () => $scope.fullscreen = !$scope.fullscreen

	$scope.btnStyle = button => ({
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
		borderRight: button.hiddenBorders.right ? 'none' : 'auto',
		...(!button.visible && {
			opacity: $scope.fullscreen ? 0 : 0.25
		})
	})

	$scope.grpStyle = group => ({
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
	})

	$scope.joyStyle = layout => ({
		...(!layout.joystick.active && {
			display: 'none'
		}),
		...(layout.joystick.anchorX === 'center' ? {
			left: '50%',
			transform: 'translateX(-50%)'
		} : {
			[layout.joystick.anchorX]: layout.joystick.x.join('')
		}),
		...(layout.joystick.anchorY === 'center' ? {
			top: '50%',
			transform: 'translateY(-50%)'
		} : {
			[layout.joystick.anchorY]: layout.joystick.y.join('')
		}),
		...(layout.joystick.anchorX === 'center' && layout.joystick.anchorY === 'center' && {
			transform: 'translate(-50%, -50%)'
		}),
		width: layout.joystick.size + 'px',
		height: layout.joystick.size + 'px'
	})

	$scope.joyFrontStyle = layout => ({
		width: layout.joystick.size / 2 + 'px',
		height: layout.joystick.size / 2 + 'px'
	})

	$scope.add = async (group = false, parent) => {
		if ($scope.openGroup) parent = $scope.viewGroup.buttons
		else parent = $scope.layout.data

		if (group) {
			parent.push(await newGroup())
			$scope.viewGroup = parent[parent.length - 1]
			$scope.openGroup = true
			$scope.setNowEditing('grpDetails')
		} else {
			parent.push(await newButton())
			$scope.viewButton = parent[parent.length - 1]
			$scope.openButton = true
			$scope.setNowEditing('btnDetails')
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
		switch (dir) {
			case 'up': obj.anchorY === 'top' ? obj.y[0] -= 2 : obj.y[0] += 2; break
			case 'down': obj.anchorY === 'top' ? obj.y[0] += 2 : obj.y[0] -= 2; break
			case 'left': obj.anchorX === 'left' ? obj.x[0] -= 2 : obj.x[0] += 2; break
			case 'right': obj.anchorX === 'left' ? obj.x[0] += 2 : obj.x[0] -= 2; break
		}
	}

	$scope.duplicate = (obj, parent) => {
		const newobj = { ...obj }
		newobj.id = rndStr()
		newobj.name += ' (copy)'
		parent.push(newobj)
	}
}])