angular.module('App').controller('LoginController', function ($rootScope, $scope, $http, $mdToast, $route, $timeout, request) {
	var self = $scope;
	var root = $rootScope;

    if($rootScope.isCookieExist()){ window.location.href = '#dashboard'; }

	root.isLogin = true;
	root.toolbar_menu = null;

	$rootScope.pagetitle = 'Login';
	self.submit_loading = true;

	self.doLogin = function () {
		self.submit_loading = true;
		request.login(self.userdata).then(function (result) {
		    var resp = result.data;
			$timeout(function () { // give delay for good UI
				self.submit_loading = true;
				if (resp == "") {
				    $mdToast.show($mdToast.simple().content('Login Failed_shi').position('bottom right'));
					window.location.href = '#dashboard';
                    window.location.reload();
				    return;
				}
                if(resp.status == "success"){
                    // saving session
                    root.saveCookies(resp.user.id, resp.user.name, resp.user.email, resp.user.password);
                    $mdToast.show($mdToast.simple().content('Login Success').position('bottom right'));
                    window.location.href = '#dashboard';
                    window.location.reload();
                } else {
				    $mdToast.show($mdToast.simple().content('Login Failed_shiv').position('bottom right'));
					window.location.href = '#dashboard';
                    window.location.reload();
                }
			}, 1000);
			//console.log(JSON.stringify(result.data));
		});
	};

});
