export default {
    '200': '服务器已成功处理了请求。通常，这表示服务器提供了请求的网页。',
    '201': '已创建,请求成功且服务器已创建了新的资源。',
    '202': '已接受,服务器已接受了请求，但尚未对其进行处理。',
    '203': '非授权信息,服务器已成功处理了请求，但返回了可能来自另一来源的信息。',
    '204': '无内容,服务器成功处理了请求，但未返回任何内容。',
    '205': '重置内容,服务器成功处理了请求，但未返回任何内容。与 204 响应不同，此响应要求请求者重置文档视图',
    '206': '部分内容,服务器成功处理了部分 GET 请求。',
    '300': '服务器根据请求可执行多种操作。服务器可根据请求者 来选择一项操作，或提供操作列表供其选择。',
    '301': '请求的网页已被永久移动到新位置。服务器返回此响应时，会自动将请求者转到新位置。',
    '302': '服务器目前正从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。',
    '303': '当请求者应对不同的位置进行单独的 GET 请求以检索响应时，服务器会返回此代码。',
    '304': '自从上次请求后，请求的网页未被修改过。服务器返回此响应时，不会返回网页内容。',
    '305': '使用代理',
    '307': '临时重定向',
    '400': '错误请求',
    '401': '身份验证错误',
    '403': '服务器拒绝请求。',
    '404': '服务器找不到请求的网页。',
    '405': '禁用请求中指定的方法。',
    '406': '无法使用请求的内容特性响应请求的网页。',
    '407': '需要代理授权',
    '408': '服务器等候请求时发生超时',
    '409': '服务器在完成请求时发生冲突。',
    '410': '请求的资源永久删除后，服务器返回此响应。',
    '412': '未满足前提条件,服务器未满足请求者在请求中设置的其中一个前提条件。',
    '413': '服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。',
    '414': '请求的 URI 过长,服务器无法处理。',
    '415': '请求的格式不受请求页面的支持。',
    '416': '请求范围不符合要求',
    '417': '未满足期望值',
    '500': '服务器内部错误,服务器遇到错误，无法完成请求。',
    '501': '服务器不具备完成请求的功能。',
    '502': '错误网关',
    '503': '服务不可用,目前无法使用服务器（由于超载或进行停机维护）。',
    '504': '网关超时,服务器作为网关或代理，未及时从上游服务器接收请求。',
    '505': '服务器不支持请求中所使用的 HTTP 协议版本。'
}