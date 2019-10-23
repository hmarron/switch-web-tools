! function(e) {
    "use strict";
    var t = [];
    e.require = function(e, r, a) {
        var n = r ? "?" + Math.round((new Date).getTime() / 1e3) : "";
        if (e += e.endsWith("/") ? "index" : "", !r && t.some(t => t.name == e)) $.each(t, function(t, o) {
            o.name == e && eval.apply(a || window, [o.script])
        });
        else {
            var s = new XMLHttpRequest;
            s.open("GET", e + (e.endsWith(".js") ? "" : ".js") + n, !1), s.onreadystatechange = function() {
                var r = s.response || s.responseText;
                if (4 == s.readyState) switch (s.status) {
                    case 200:
                        eval.apply(a || window, [r]), o && t.push({
                            name: e,
                            script: r
                        })
                }
            }, s.send(null)
        }
    };
    var o = "https://dns.switchbru.com/js/";
    require(o + "gamepad", !0), require(o + "jquery.min", !0);
    var r = new Gamepad;
    r.init();
    var a, n, s, i, c = "https://dns.switchbru.com/oauth/";
    a = n = s = i = !1;
    var l = $(document.currentScript),
        u = "(-webkit-nintendo-switch-device-mode: -webkit-nintendo-switch-device-";
    matchMedia(u + "console)").addListener(function() {
        s && s(device.mode())
    });
    var d = {
            id: "",
            secret: ""
        },
        p = !0;
    e.app = {
        base64Decode: function(e) {
            return decodeURIComponent(Array.prototype.map.call(atob(e), function(e) {
                return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        },
        base64Encode: function(e) {
            return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
                return String.fromCharCode(parseInt(t, 16))
            }))
        },
        currentState: function() {
            try {
                return app.base64Decode(app.base64Decode(location.hash.replace("#", "")))
            } catch (e) {
                return ""
            }
        },
        exitLoop: function() {
            p = !1
        },
        loadState: function(e) {
            "object" == typeof e ? $.each(e, function(e, t) {
                e == app.currentState() && ("function" == typeof t ? (n = !0, $(document).ready(function() {
                    t()
                })) : alert("Error: The value of the state's key in app.loadState() must be a function!"))
            }) : alert("Error: You must pass an object to app.loadState()!")
        },
        mainLoop: function(e, t, o) {
            i ? alert("Error: A function for app.mainLoop() has already been set!") : "number" == typeof o || void 0 === o ? "function" == typeof e ? (setInterval(function() {
                if (p) {
                    void 0 === t && (t = !1);
                    var o = $("#userProfilePopUp").length,
                        r = $("#keyboardApplet").length;
                    if (!device.isSwitch || !$("html:hover").length || t || a) {
                        $("#disableCursorPopUp").hide();
                        var n = 2 == input.getPressed();
                        n && !l.attr("disable-pushstate") && history.pushState({}, "", ""), (o || r) && (n && o ? $("#userProfilePopUp").fadeOut("slow", function() {
                            $(this).remove()
                        }) : r && n && j(), h = m = f = 0), e()
                    } else $("#disableCursorPopUp").fadeIn("fast");
                    h = m = 0
                }
            }, Math.round(1e3 / (o || 60))), i = !0) : alert("Error: You must pass a function to app.mainLoop()!") : alert('Error: The "fps" property must be a valid integer in app.mainLoop()!')
        },
        onLoad: function(e) {
            "function" == typeof e ? document.addEventListener("DOMContentLoaded", function(t) {
                n || e()
            }) : alert("Error: You must pass a function to app.onLoad()!")
        },
        setState: function(e) {
            F = !0, location.hash = app.base64Encode(app.base64Encode(e))
        }
    }, e.device = {
        docked: 2,
        handheld: 1,
        isSwitch: "Nintendo Switch" == navigator.platform,
        lang: function() {
            return navigator.language
        },
        mode: function() {
            return matchMedia(u + "handheld)").matches ? 1 : matchMedia(u + "console)").matches ? 2 : 0
        },
        modeChanged: function(e) {
            "function" == typeof e ? s = e : alert("Error: You must pass a function to device.modeChanged()!")
        },
        modeName: function() {
            return 1 == device.mode ? "Handheld" : 2 == device.mode ? "Docked" : "Unknown"
        },
        PlatformName: navigator.platform,
        randomNum: function(e, t) {
            var o, r;
            return void 0 === t ? (o = 0, r = e) : (o = e, r = t), Math.floor(Math.random() * (r - o + 1)) + o
        }
    }, e.input = {
        None: 0,
        A: 1,
        B: 2,
        Y: 3,
        X: 4,
        L: 5,
        R: 6,
        ZL: 7,
        ZR: 8,
        DPadUp: 9,
        DPadRight: 10,
        DPadDown: 11,
        DPadLeft: 12,
        LStickUp: 13,
        LStickRight: 14,
        LStickDown: 15,
        LStickLeft: 16,
        RStickUp: 17,
        RStickRight: 18,
        RStickDown: 19,
        RStickLeft: 20,
        RStick: 21,
        Touch: 22,
        getHeld: function() {
            return f
        },
        getPressed: function() {
            return h
        },
        getReleased: function() {
            return m
        },
        getStickValues: function(e) {
            "function" == typeof e ? e({
                x: P,
                y: A
            }, {
                x: S,
                y: D
            }) : alert("Error: You must pass a callback function to input.getStickValues()!")
        }
    }, e.switchbru = {
        clearPresence: function(e, t) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.clearPresence()!") : "function" != typeof t ? t = function() {} : $.ajax({
                url: c + "clearPresence",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? t(e.server, e.data) : t(e.server, {})
                }
            })
        },
        downloadSaveData: function(e, t) {
            void 0 === e ? alert("Error: You must pass an access token to switchbru.downloadSaveData()!") : "function" != typeof t ? alert("Error: You must pass a callback function to switchbru.downloadSaveData()!") : $.ajax({
                url: c + "downloadSaveData",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? t(e.server, e.data) : t(e.server, {})
                }
            })
        },
        getAccountData: function(e, t) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.getAccountData()!") : "function" != typeof t ? alert("Error: You must pass a callback function to switchbru.getAccountData()!") : $.ajax({
                url: c + "getAccountData",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? t(e.server, e.data) : t(e.server, {})
                }
            })
        },
        getUserData: function(e, t) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.getUserData()!") : "function" != typeof t ? alert("Error: You must pass a callback function to switchbru.getUserData()!") : $.ajax({
                url: c + "getUserData",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? t(e.server, e.data) : t(e.server, {})
                }
            })
        },
        getUserFriends: function(e, t) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.getUserFriends()!") : void 0 === t || "function" != typeof t ? alert("Error: You must pass a callback function to switchbru.getUserFriends()!") : $.ajax({
                url: c + "getUserFriends",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status && e.data.friends ? t(e.server, e.data) : t(e.server, {})
                }
            })
        },
        getUserToken: function(e, t, o, r) {
            void 0 === t && (t = !1), void 0 === o && (o = !1), void 0 === r && (r = !0), "function" != typeof e ? alert("Error: You must pass a callback function to switchbru.getUserToken()!") : $.ajax({
                url: c + "getUserToken",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret
                },
                dataType: "json",
                xhrFields: {
                    withCredentials: !0
                },
                success: function(a) {
                    if (200 == a.server.status)
                        if (a.data.authenticate) {
                            var n = c + "authorize?client_id=" + d.id;
                            t && (n += "&return_state=" + app.base64Encode(app.base64Encode(t))), o && (n += "&cancelled_state=" + app.base64Encode(app.base64Encode(o))), location.href = n
                        } else {
                            var s = a.data.access_token;
                            e(a.server, s), r && $.ajax({
                                url: c + "showNotifications",
                                method: "GET",
                                data: {
                                    client_id: d.id,
                                    client_secret: d.secret,
                                    access_token: s
                                },
                                dataType: "json",
                                success: function(e) {
                                    200 == e.server.status && $("body").prepend('<iframe allowtransperency="true" height="125" onload="this.style.visibility=\'visible\';" scrolling="no" src="https://switchbru.com/dns/notifs?client_id=' + d.id + "&access_token=" + s + '" style="background:none;border:none;pointer-events:none;position:absolute;visibility:hidden;z-index:99999999;" width="450"></iframe>')
                                }
                            })
                        }
                    else e(a.server, "")
                }
            })
        },
        isFriend: function(e, t, o) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.isFriend()!") : void 0 === t ? alert("Error: You must pass a user's online ID to switchbru.isFriend()") : void 0 === o || "function" != typeof o ? alert("Error: You must pass a callback function to switchbru.isFriend()!") : $.ajax({
                url: c + "isFriend",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e,
                    user_id: t
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? o(e.server, e.data.friend) : o(e.server, !1)
                }
            })
        },
        setClient: function(e, t) {
            "" != d.id && "" != d.secret ? alert("Error: Client ID and secret have already been set.") : void 0 === e ? alert("Error: Client ID must be set in switchbru.setClient()!") : void 0 === t ? alert("Error: Client secret must be set in switchbru.setClient()!") : d = {
                id: e,
                secret: t
            }
        },
        setPresence: function(e, t, o) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.setPresence()!") : void 0 === t ? alert("Error: You must pass the presence string to switchbru.setPresence()!") : typeof t.length > 50 ? alert("Error: The presence string length must not be greater than 50 in switchbru.setPresence()!") : "function" != typeof o ? o = function() {} : $.ajax({
                url: c + "setPresence",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e,
                    presence: t
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? o(e.server, e.data) : o(e.server, {})
                }
            })
        },
        showUserProfile: function(e, t, o) {
            $("#userProfilePopUp").length || (l.attr("allow-scrolling") || ScriptTagEl.attr("allow-zooming") ? alert("Error: Scrolling and zooming must be disabled to show user profiles!") : ($("body").append('<div id="userProfilePopUp" style="background-color:rgba(0, 0, 0, 0.7);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:99999997;"><div id="tempProfileBackdrop" style="background-color:#2d2d2d;border:none;height:100%;left:8.5%;position:absolute;width:84%"></div></div>'), $("#userProfilePopUp").fadeIn("slow"), $.ajax({
                url: c + "getProfileToken",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e,
                    user_id: t
                },
                dataType: "json",
                success: function(t) {
                    200 == t.server.status ? ($("#userProfilePopUp").html('<iframe id="userProfilePopUpFrame" onload="this.style.visibility=\'visible\';" style="background-color:#2d2d2d;border:none;height:100%;left:8.5%;position:absolute;visiblity:hidden;width:84%" src="https://switchbru.com/dns/user_popup?client_id=' + d.id + "&access_token=" + e + "&profile_token=" + t.data.token + '"></iframe>'), R = app.currentState(), history.pushState({}, "", ""), app.setState(R)) : ($("#userProfilePopUp").fadeOut("fast", function() {
                        $(this).remove()
                    }), void 0 !== o && "function" == typeof o && o(t.server))
                },
                error: function() {
                    $("#userProfilePopup").fadeOut("fast", function() {
                        $(this).remove()
                    }), void 0 !== o && "function" == typeof o && o()
                }
            })))
        },
        unlockAchievement: function(e, t, o) {
            void 0 === e ? alert("Error: You must pass a user token to switchbru.unlockAchievement()!") : void 0 === t ? alert("Error: You must pass an achievement ID to switchbru.unlockAchievement()!") : "function" != typeof o ? alert("Error: You must pass a callback function to switchbru.unlockAchievement()!") : $.ajax({
                url: c + "unlockAchievement",
                method: "GET",
                data: {
                    client_id: d.id,
                    client_secret: d.secret,
                    access_token: e,
                    achievement_id: t
                },
                dataType: "json",
                success: function(e) {
                    200 == e.server.status ? o(e.server, e.data) : o(e.server, {})
                }
            })
        },
        uploadSaveData: function(e, t, o) {
            if (void 0 === e) alert("Error: You must pass a user token to switchbru.uploadSaveData()!");
            else if (void 0 === t) alert("Error: You must pass save data to switchbru.uploadSaveData()!");
            else if ("function" != typeof o) alert("Error: You must pass a callback function to switchbru.uploadSaveData()!");
            else {
                var r = new FormData;
                r.append("save_data", t), $.ajax({
                    url: c + "uploadSaveData?client_id=" + d.id + "&client_secret=" + d.secret + "&access_token=" + e,
                    type: "POST",
                    processData: !1,
                    contentType: !1,
                    cache: !1,
                    data: r,
                    dataType: "json",
                    success: function(e) {
                        200 == e.server.status ? o(e.server, e.data) : o(e.server, {})
                    }
                })
            }
        }
    }, e.ui = {
        down: function() {
            if ($("[selected]").length && $("[selected]").attr("down")) {
                var e = $("[selected]");
                return e.removeAttr("selected"), $("[ui-id='" + e.attr("down") + "']").attr("selected", "true"), !0
            }
            return !1
        },
        KeyboardApplet: class {
            constructor(e) {
                this.obj = e, this.shown = !1
            }
            get obj() {
                return this._obj
            }
            set obj(e) {
                if ("object" == typeof e) {
                    if (e.description && e.description > 150) return void console.log("Error: 'description' must not be larger than 150 characters in ui.KeyboardApplet!");
                    if (e.maximum && isNaN(e.maximum)) return void console.log("Error: 'maximum' must be a number in new ui.KeyboardApplet!");
                    if (e.maximum && e.maximum > 500) return void console.log("Error: 'maximum' must not be larger than 500 in new ui.KeyboardApplet!");
                    if (e.placeholder && "string" != typeof e.placeholder && "number" != typeof e.placeholder) return void console.log("Error: 'placeholder' must be a string in new ui.KeyboardApplet!");
                    if (e.title && "string" != typeof e.title && "number" != typeof e.title) return void console.log("Error: 'title' must be a string in new ui.KeyboardApplet!");
                    if (e.title && e.title.length > 80) return void console.log("Error: 'title' must not be larger than 80 characters in ui.KeyboardApplet!");
                    if (e.type && "string" != typeof e.type && "text" != e.type && "number" != e.type && "code" != e.type && "hidden" != e.type && "password" != e.type) return void console.log("Error: type '" + e.type + "' is invalid in new ui.KeyboardApplet!");
                    if (e.value && (!e.maximum && e.value.length > 500 || e.maximum && e.value.length > e.maximum)) return void console.log("Error: value must be below the maximum length in new ui.KeyboardApplet!");
                    this._obj = e
                } else this._obj = {}
            }
            show() {
                if (this.shown) console.log("Error: An instance of the keyboard applet can only be shown once.");
                else if (l.attr("allow-scrolling") || l.attr("allow-zooming")) console.log("Error: Scrolling and zooming must be disabled to show the keyboard applet!");
                else {
                    var t = 0,
                        o = "",
                        r = "text",
                        a = 500,
                        n = 500,
                        s = "solid 2px #FFF",
                        i = "",
                        c = 75,
                        u = 77,
                        d = "",
                        p = "",
                        f = "";
                    if (this.obj.maximum && (a = n = this.obj.maximum), this.obj.placeholder && (i = this.obj.placeholder), this.obj.type && ("number" == this.obj.type ? r = "tel" : "code" == this.obj.type ? (r = "tel", a = 12, n = 14) : "hidden" != this.obj.type && "password" != this.obj.type || (r = "password")), this.obj.title && a <= 20 && (p = this.obj.title.replace(/\n/g, "\\n")), this.obj.description && a <= 20 && (o = this.obj.description.replace(/\n/g, "\\n")), this.obj.value && (f = this.obj.value, (t = f.length) == a && (d = 'color:white" maximum="true')), "function" != typeof this.callback) return console.log("Error: A function 'callback' must be created under new ui.KeyboardApplet!"), !1;
                    if ("function" != typeof this.cancelled && (this.cancelled = function() {
                            this.callback("")
                        }), $("#userProfilePopUp").length || $("#keyboardApplet").length) this.cancelled();
                    else {
                        var h = this;
                        if (!$("#keyboardAppletPageWrapper").length) return $("#disableCursorPopUp").after('<div id="keyboardAppletPageWrapper" style="display:inline;transition:all 0.5s ease;"></div>'), $("#disableCursorPopUp").siblings().not("iframe").appendTo("#keyboardAppletPageWrapper"), setTimeout(function() {
                            $("#keyboardAppletPageWrapper").css("filter", "blur(4px)");
                            var l = "",
                                m = 60,
                                b = 105,
                                v = 10;
                            a <= 20 && (l = "box-shadow: 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff, 0px 2px 0px #fff;", m = 160, v = 15, s = "none", b = 5, "code" != h.obj.type ? a > 10 ? u = (c = 3.5 * a) + 2 : (c = 35, u = 37) : (l += "text-transform:uppercase;", c = 68, u = 70)), $("#keyboardApplet").length || ($("#disableCursorPopUp").after('<div id="keyboardApplet" style="background-color:rgba(0, 0, 0, 0.7);display:none;height:100%;position:fixed;width:100%;z-index:99999998;"><div style="color:white;font-size:28px;left:200px;max-height:0px;position:relative;top:58px;white-space:nowrap;">' + p + '<br><span style="color:darkgrey;font-size:22px;">' + o + '</span></div><form id="keybordApplet-form" onsubmit="return keyboardAppletSubmit()"><input id="keyboardApplet-text" maxlength="' + n + '" nx-se-disabled placeholder="' + i + '" spellcheck="false" style="background:none;border:none;caret-color:#6dccea;color:white;display:block;font-size:31px;margin-left:auto;margin-right:auto;margin-top:' + m + "px;outline:" + s + ";padding-bottom:" + b + "px;padding-left:15px;padding-top:" + v + "px;resize:none;width:" + c + "%;" + l + '" type="' + r + '" value="' + f + '"><div id="keyboardApplet-count" style="color:grey;font-size:20px;margin-left:auto;margin-right:auto;margin-top:5px;position:relative;right:0px;transition:right ease 70ms;width:' + u + '%;"><span style="float:right;' + d + '">' + t + "/" + a + "</span></div></form></div>"), setTimeout(function() {
                                $("#keyboardApplet").fadeIn("fast", function() {
                                    $("#keyboardApplet-text").focus(), C($("#keyboardApplet-text").get(0), n + 1), j = function() {
                                        U(function() {
                                            h.cancelled()
                                        })
                                    }, e.keyboardAppletSubmit = function() {
                                        var e = $("#keyboardApplet-text").val();
                                        return "code" == h.obj.type && (e = e.toUpperCase()), U(function() {
                                            h.callback(e)
                                        }), !1
                                    }, $("#keyboardApplet-text").blur(function() {
                                        j()
                                    }), $("#keyboardApplet-text").keyup(function(e) {
                                        var t = $(this).val().length,
                                            o = e.target.selectionStart;
                                        if (37 != e.keyCode && 39 != e.keyCode) {
                                            var r = $("#keyboardApplet-count"),
                                                n = $(this).val().replace(/\s/g, "").replace(/(\d{4}(?!$))/gm, "$1 ").substr(0, 14);
                                            "code" == h.obj.type && ((o == n.length || o + 1 == n.length && " " == n.slice(-2, -1)) && (o = n.length), t = n.replace(/\s/g, "").length, $(this).val(n), C($("#keyboardApplet-text").get(0), o)), r.find("span").text(t + "/" + a), t == a ? r.attr("maximum") && "0px" == r.css("right") ? (r.css("right", "12px"), setTimeout(function() {
                                                r.css("right", "-5px"), setTimeout(function() {
                                                    r.css("right", "0px")
                                                }, 70)
                                            }, 70)) : (r.css("color", "white"), r.attr("maximum", "true")) : (r.css("color", ""), r.removeAttr("maximum"))
                                        }
                                    })
                                })
                            }, 200))
                        }, 100), this.shown = !0, !0
                    }
                }
                return !1
            }
        },
        left: function() {
            if ($("[selected]").length && $("[selected]").attr("left")) {
                var e = $("[selected]");
                return e.removeAttr("selected"), $("[ui-id='" + e.attr("left") + "']").attr("selected", "true"), !0
            }
            return !1
        },
        right: function() {
            if ($("[selected]").length && $("[selected]").attr("right")) {
                var e = $("[selected]");
                return e.removeAttr("selected"), $("[ui-id='" + e.attr("right") + "']").attr("selected", "true"), !0
            }
            return !1
        },
        select: function(e) {
            if ($(e).length) var t = $(e);
            else {
                if (!$("[ui-id='" + e + "']").length) return !1;
                t = $("[ui-id='" + e + "']")
            }
            return $("[selected]").removeAttr("selected"), t.attr("selected", "true"), !0
        },
        up: function() {
            if ($("[selected]").length && $("[selected]").attr("up")) {
                var e = $("[selected]");
                return e.removeAttr("selected"), $("[ui-id='" + e.attr("up") + "']").attr("selected", "true"), !0
            }
            return !1
        }
    };
    var f, h, m, b, v, g, y, x, k, w, _, E, T, P, A, S, D, j = function() {},
        U = function(e) {
            $("[id='keyboardApplet']").fadeOut("slow", function() {
                $(this).remove();
                var t = $("[id='keyboardAppletPageWrapper']");
                t.css("filter", ""), setTimeout(function() {
                    var o = t.last().html();
                    $("#disableCursorPopUp").after(o), t.remove(), setTimeout(e, 5)
                }, 200)
            })
        },
        C = function(e, t) {
            if (e.setSelectionRange) e.focus(), e.setSelectionRange(t, t);
            else if (e.createTextRange) {
                var o = e.createTextRange();
                o.collapse(!0), o.moveEnd("character", t), o.moveStart("character", t), o.select()
            }
        };
    e.keyboardAppletSubmit = function() {}, f = h = m = 0, r.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
        switch (e.control) {
            case "DPAD_UP":
                h = f = 9;
                break;
            case "DPAD_LEFT":
                h = f = 12;
                break;
            case "DPAD_RIGHT":
                f = h = 10;
                break;
            case "DPAD_DOWN":
                f = h = 11;
                break;
            case "FACE_1":
                f = h = 2;
                break;
            case "FACE_2":
                f = h = 1;
                break;
            case "FACE_3":
                f = h = 3;
                break;
            case "FACE_4":
                f = h = 4;
                break;
            case "LEFT_BOTTOM_SHOULDER":
                f = h = 7;
                break;
            case "RIGHT_BOTTOM_SHOULDER":
                f = h = 8;
                break;
            case "LEFT_TOP_SHOULDER":
                f = h = 5;
                break;
            case "RIGHT_TOP_SHOULDER":
                f = h = 6;
                break;
            case "RIGHT_STICK":
                f = h = 21
        }
    }), r.bind(Gamepad.Event.BUTTON_UP, function(e) {
        switch (e.control) {
            case "DPAD_UP":
                m = 9;
                break;
            case "DPAD_LEFT":
                m = 12;
                break;
            case "DPAD_RIGHT":
                m = 10;
                break;
            case "DPAD_DOWN":
                m = 11;
                break;
            case "FACE_1":
                m = 2;
                break;
            case "FACE_2":
                m = 1;
                break;
            case "FACE_3":
                m = 3;
                break;
            case "FACE_4":
                m = 4;
                break;
            case "LEFT_BOTTOM_SHOULDER":
                m = 7;
                break;
            case "RIGHT_BOTTOM_SHOULDER":
                m = 8;
                break;
            case "LEFT_TOP_SHOULDER":
                m = 5;
                break;
            case "RIGHT_TOP_SHOULDER":
                m = 6;
                break;
            case "RIGHT_STICK":
                m = 21
        }
        f == m && (f = 0)
    }), b = v = 0, g = y = x = k = w = _ = E = T = !1, P = A = S = D = 0, r.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
        switch (e.axis) {
            case "LEFT_STICK_X":
                e.value < -.5 && !x ? (h = f = b = 16, x = !0, k = !1) : e.value > .5 && !k ? (h = f = b = 14, k = !0, x = !1) : e.value < .5 && e.value > -.5 && (16 != f && 14 != f || (f = 0), x = !1, k = !1, L(1, e.value)), P = e.value;
                break;
            case "RIGHT_STICK_X":
                e.value < -.5 && !E ? (h = f = v = 20, E = !0, T = !1) : e.value > .5 && !T ? (h = f = v = 18, T = !0, E = !1) : e.value < .5 && e.value > -.5 && (20 != f && 18 != f || (f = 0), E = !1, T = !1, L(2, e.value)), S = e.value;
                break;
            case "LEFT_STICK_Y":
                e.value > .5 && !y ? (h = f = b = 15, y = !0, g = !1) : e.value < -.5 && !g ? (h = f = b = 13, g = !0, y = !1) : e.value < .5 && e.value > -.5 && (15 != f && 13 != f || (f = 0), g = !1, y = !1, L(1, e.value)), A = e.value;
                break;
            case "RIGHT_STICK_Y":
                e.value > .5 && !_ ? (h = f = v = 19, _ = !0, w = !1) : e.value < -.5 && !w ? (h = f = v = 17, w = !0, _ = !1) : e.value < .5 && e.value > -.5 && (19 != f && 17 != f || (f = 0), w = !1, _ = !1, L(2, e.value)), D = e.value
        }
    });
    var L = function(e, t) {
        1 == e ? !b || y || x || k || g || 1 == t || -1 == t || (m = b, b = 0) : !v || _ || E || T || w || 1 == t || -1 == t || (m = v, v = 0)
    };
    $(window).on("popstate", function(e) {
        $("#userProfilePopUp").length && $("#userProfilePopUp").fadeOut("slow", function() {
            $(this).remove()
        }), F || app.setState(R), F = !1
    });
    var R = "",
        F = !1;
    $(document).ready(function() {
        setInterval(function() {
            $("#disableCursorPopUp").length || $("body").prepend('<div id="disableCursorPopUp" style="background-color:rgba(0, 0, 0, 0.7);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:99999997;"><span style="color:white;font-family:sans-serif;font-size:60px;font-weight:normal;position:absolute;text-align:center;text-transform:none;top:50%;width:100%;">Please disable the cursor to continue.</span></div>'), l.attr("allow-scrolling") || $("html, body").css({
                height: "100%",
                margin: "0",
                "max-height": "100%",
                "max-width": "100%",
                overflow: "hidden",
                padding: "0",
                position: "relative"
            }), l.attr("allow-zooming") || $("meta#zooming").length || $("head").append('<meta id="zooming" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />'), R = app.currentState()
        }, 20), $("html").on("touchstart touchend", function() {
            $("#disableCursorPopUp:hover").length || setTimeout(function() {
                a = !0
            }, 1)
        }).mousemove(function() {
            a = !1
        }).on("touchstart", function() {
            "none" == $("#disableCursorPopUp").css("display") && (f = h = 22)
        }).on("touchend", function() {
            "none" == $("#disableCursorPopUp").css("display") && (m = 22, 22 == f && (f = 0))
        }), history.replaceState("", document.title, window.location.pathname + window.location.search), l.attr("disable-pushstate") || history.pushState({}, "", "")
    })
}(window);
