## paging
```javascript

    angular.module('myapp',['ngui-paging']);
    ... 
    function ctrl($pagingFactory){
        ...
        var paging = self.paging = $pagingFactory();
        ...
        // handle uri //xxx.com/foo/bar?limit=10&page=2
        // resp: {
            items: [{},{},...],
            total: 48
        }
        
        var load = function(){
            http.get('//xxx.com/foo/bar',{
                params: {limit:paging.limit, page: paging.page }
            })
                .success(function(resp){
                    self.items = resp.items;                    
                    paging.update({
                        total : resp.total
                    })
                });
        }
        
        
        ctrl.changePage = function(){
            load();        
        }
    }

```

```html
    <ul>
        <li ng-repeat="it in ctrl.items"> {{it}}</li>
    </ul>
    <div ui-paging="ctrl.paging" on-change="ctrl.changePage()"></div>

```