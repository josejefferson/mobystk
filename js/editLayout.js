angular.module('joystick', []).controller('editLayoutCtrl', ['$scope', ($scope) => {
	Lockr.prefix = 'joystick.'
	$scope.nowEditing = null
	$scope.fullscreen = false
	$scope.layouts = Lockr.smembers('layouts')
	$scope.layout = {
		id: 'da87bkab',
		platformVersion: '0.0.0',
		version: 1,
		name: 'PSP',
		data: [
			{
				id: 'ddasdasd',
				name: 'Left trigger',
				content: 'L',
				visible: true,
				key: 'ctrl,a',
				anchorX: 'left',
				anchorY: 'top',
				x: [0, 'px'],
				y: [0, 'px'],
				width: [50, '%'],
				height: [30, 'px'],
				fontSize: [20, 'px'],
				hiddenBorders: {
					top: true,
					left: true,
					bottom: false,
					right: false
				},
				borderRadius: [
					[10, 'px'],
					[10, 'px'],
					[10, 'px'],
					[10, 'px']
				],
				rounded: false,
				css: '',
				lock: false
			},
			{
				id: 'dsadasds',
				group: true,
				anchorX: 'center',
				anchorY: 'center',
				x: [0, 'px'],
				y: [0, 'px'],
				width: [50, '%'],
				height: [30, 'px'],
				buttons: [{
					id: 'ddasdasd',
					name: 'Left trigger',
					content: 'L',
					visible: true,
					key: 'ctrl,a',
					anchorX: 'left',
					anchorY: 'top',
					x: [0, 'px'],
					y: [0, 'px'],
					width: [50, '%'],
					height: [30, 'px'],
					fontSize: [20, 'px'],
					hiddenBorders: {
						top: true,
						left: true,
						bottom: false,
						right: false
					},
					borderRadius: [
						[10, 'px'],
						[10, 'px'],
						[10, 'px'],
						[10, 'px']
					],
					rounded: false,
					lock: false
				}]
			}
		]
	}

	$scope.test = [[['HIII']]]
	$scope.isGroup = e => !!e.group
	$scope.setNowEditing = (n, k) => {
		$scope.nowEditing = n
		$scope.nowEditingKey = k
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

	$scope.add = (parent, group = false) => {
		if (!group) parent.push({
			id: 'randomSTRING', //
			name: '[New button]',
			content: 'NEW BUTTON',
			visible: true,
			key: '',
			anchorX: 'left',
			anchorY: 'top',
			x: [0, 'px'],
			y: [0, 'px'],
			width: [200, 'px'],
			height: [30, 'px'],
			fontSize: [20, 'px'],
			hiddenBorders: {
				top: false,
				left: false,
				bottom: false,
				right: false
			},
			borderRadius: [
				[0, 'px'],
				[0, 'px'],
				[0, 'px'],
				[0, 'px']
			],
			rounded: false, //
			lock: false
		})

		if (group) parent.push({
			id: 'reandasodasd',
			name: '[New group]',
			group: true,
			anchorX: 'left',
			anchorY: 'top',
			x: [0, 'px'],
			y: [0, 'px'],
			width: [200, 'px'],
			height: [200, 'px'],
			buttons: []
		})
	}

	$scope.remove = (item, parent) => {
		if (confirm('Are you sure?')) {
			const i = parent.indexOf(item)
			if (i > -1) parent.splice(i, 1)
		}
	}
}])