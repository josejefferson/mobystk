angular.module('joystick', []).controller('editLayoutCtrl', ['$scope', ($scope) => {
	Lockr.prefix = 'joystick.'
	$scope.nowEditing = null
	$scope.layouts = Lockr.smembers('layouts')
	$scope.layout = {
		id: 'da87bkab',
		platformVersion: '0.0.0',
		version: 1,
		name: 'PSP',
		data: [
			{
				id: 'ddasdasd',
				name: 'Left gatilho',
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
				group: true,
				anchorX: 'left',
				anchorY: 'top',
				x: [0, 'px'],
				y: [0, 'px'],
				width: [50, '%'],
				height: [30, 'px'],
				buttons: [{
					id: 'ddasdasd',
					name: 'Left gatilho',
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
			[button.anchorX]: button.x.join(''),
			[button.anchorY]: button.y.join(''),
			width: button.width.join(''),
			height: button.height.join(''),
			fontSize: button.fontSize.join(''),
			borderRadius: button.rounded ? '50%' : button.borderRadius.map(b => b.join('')).join(' ')
			// css
			// hidden borders
		}
	}

	$scope.grpStyle = (group) => {
		return {
			[group.anchorX]: group.x.join(''),
			[group.anchorY]: group.y.join(''),
			width: group.width.join(''),
			height: group.height.join(''),
		}
	}
}])