var messages = {
	"INTRO_MSG" : "Cannot place order, conditions not met: \n\n",
	"NOT_VALID_MSG" : "Order not valid",
	"VERIFYING_MSG" : "Verifying",
	"CART_UPDATE_MSG" : "Cart needs to be updated",
	"CART_UPDATE_MSG2" : 'Cart contents have changed, you must click "Update quantities" before proceeding.',
	"MIN_WEIGHT_MSG" : "Current weight: !WEIGHT grams is less than the minimum order weight: !MINWEIGHT grams.",
	"MAX_WEIGHT_MSG" : "Current weight: !WEIGHT grams is more than the maximum order weight: !MAXWEIGHT grams.",
	"MIN_SUBTOTAL_MSG" : "Must have at least $!MINSUBTOTAL in total.",
	"MAX_SUBTOTAL_MSG" : "Must have at most $!MAXSUBTOTAL in total.",
	"PROD_MIN_MSG" : "!PRODUCTNAME: Must have at least !PRODUCTMIN of this item.",
	"PROD_MAX_MSG" : "!PRODUCTNAME:: Must have at most !PRODUCTMAX of this item.",
	"PROD_MULT_MSG" : "!PRODUCTNAME:: Quantity must be a multiple of !PRODUCTMULT.",
	"TOTAL_ITEMS_MAX_MSG" : "Must have at most !MAXTOTALITEMS items total.",
	"TOTAL_ITEMS_MIN_MSG" : "Must have at least !MINTOTALITEMS items total.",
	"TOTAL_ITEMS_MULT_MSG" : "Must have a multiple of !MULTTOTALITEMS items total.",
	"GROUP_MIN_MSG" : "Must have at least !GROUPMIN of !GROUPTITLE.",
	"GROUP_MAX_MSG" : "Must have less than !GROUPMAX of !GROUPTITLE.",
	"GROUP_MULT_MSG" : "!GROUPTITLE quantity must be a multiple of !GROUPMULT."
};

var limitsJson = {};

var isValid = false;

var cartJson;

var originalSubmitText;

var errorMessage = getMessage("INTRO_MSG", null);

function getMessage(tag, values) {
	var message = messages[tag];
	if (limitsJson['messages'] != null) {
		if (limitsJson['messages'][tag] != null) {
			message = limitsJson['messages'][tag];
		}
	}

	message = unescape(message);
	if(values != null){
		for (i in values) {
			message = message.replace(i, values[i]);
		}
	}


	return message;
}

function decorateCell(cell, message) {
	$(cell).append('<span style="color:red;font-size:large;" title="' + message + '">*</span>');
	errorMessage = errorMessage + message + "\n";
}

function showMessage() {
	if (isValid) {
		return true;
	}

	alert(errorMessage);
	return false;
}

function mmDisableCheckout() {
	submitText = originalSubmitText;
	submitText = getMessage("NOT_VALID_MSG", null);

	$('[name="checkout"]').val(submitText);
	isValid = false;
}

function mmEnableCheckout() {
	$('[name="checkout"]').val(originalSubmitText);
	isValid = true;
}

function mmIsEnabled() {
	return isValid;
}

function setCheckoutToVerifying() {
	$('[name="checkout"]').val(getMessage("VERIFYING_MSG", null));
	isValid = false;
}

function getSubtotal() {
	var subtotal = Number(cartJson['total_price']);
	subtotal = subtotal / 100.0;
	return subtotal;
}

function getSubTotalCell() {
	return $('.subtotal')[0];
}

function getCellForItem(item) {
	var id = item['id'];
	var quantity_id = '#updates_' + id;
	var cell = $(quantity_id).closest('td')[0];
	return cell;
}

function checkSubTotal() {
	var subtotal = getSubtotal();

	var minorder = Number(limitsJson['minorder']);
	var maxorder = Number(limitsJson['maxorder']);
	cell = getSubTotalCell();

	if (subtotal < minorder) {
		var message = getMessage("MIN_SUBTOTAL_MSG", {
			"!MINSUBTOTAL" : minorder
		});
		decorateCell(cell, message);
		return false;
	}
	if ((maxorder > 0) && (subtotal > maxorder)) {
		var message = getMessage("MAX_SUBTOTAL_MSG", {
			"!MAXSUBTOTAL" : maxorder
		});
		decorateCell(cell, message);
		return false;
	}

	return true;
}

function getWeight() {
	var weight = Number(cartJson['total_weight']);
	return weight
}

function checkWeight() {
	var weight = getWeight();

	var minweight = Number(limitsJson['weightmin']);
	var maxweight = Number(limitsJson['weightmax']);
	cell = getSubTotalCell();

	if (weight < minweight) {
		var message = getMessage("MIN_WEIGHT_MSG", {
			"!WEIGHT" : weight,
			"!MINWEIGHT" : minweight
		});
		decorateCell(cell, message);
		return false;
	}
	if ((maxweight > 0) && (weight > maxweight)) {
		var message = getMessage("MAX_WEIGHT_MSG", {
			"!WEIGHT" : weight,
			"!MAXWEIGHT" : maxweight
		});
		decorateCell(cell, message);
		return false;
	}

	return true;
}

function checkProductLimit(quantity, productName, item, min, max, multiple) {
	if (quantity < min) {
		var message = getMessage("PROD_MIN_MSG", {
			"!PRODUCTNAME" : productName,
			"!PRODUCTMIN" : min
		});
		decorateCell(getCellForItem(item), message);
		return false;
	}

	if ((max > 0) && (quantity > max)) {
		var message = getMessage("PROD_MAX_MSG", {
			"!PRODUCTNAME" : productName,
			"!PRODUCTMAX" : max
		});
		decorateCell(getCellForItem(item), message);
		return false;
	}

	if ((multiple > 1) && (quantity % multiple > 0)) {
		var message = getMessage("PROD_MULT_MSG", {
			"!PRODUCTNAME" : productName,
			"!PRODUCTMULT" : multiple
		});
		decorateCell(getCellForItem(item), message);
		return false;
	}

	return true;
}

function collectProductQuantities() {
	var items = cartJson['items'];
	var products = {};

	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var handle = item['handle'];
		var prodLimit = getProductLimits(handle);
		var prodCombine = false;
		if (prodLimit && ('combine' in prodLimit))
			prodCombine = prodLimit['combine'];

		if ((getSkuFilter(item['sku']) != null) || !prodCombine) {
			var variant = handle + " " + item['sku'];
			if (item['sku'] == "") {
				variant += item['variant_id'];
			}

			var productDetails = {};
			productDetails['title'] = unescape(item['title']);
			productDetails['id'] = item['id'];
			productDetails['quantity'] = Number(item['quantity']);

			products[variant] = productDetails;
		} else {
			var productDetails = products[handle];
			if (productDetails == undefined) {
				productDetails = {};
				productDetails['title'] = unescape(item['title']);
				productDetails['id'] = item['id'];
				productDetails['quantity'] = Number(item['quantity']);
				products[handle] = productDetails;
			} else {
				productDetails['quantity'] += Number(item['quantity']);
			}
		}
	}

	return products;
}

function getSkuFilter(sku) {
	var skuFilters = limitsJson['skus'];
	for (var i in skuFilters) {
		var skuFilter = skuFilters[i];
		if (sku.indexOf(unescape(skuFilter['filter'])) > -1) {
			return skuFilter;
		}
	}

	return null;
}

function getGroupFilter(handle) {
	var productGroups = limitsJson['groupLimits'];
	for (var i in productGroups) {
		var group = productGroups[i];

		if (group['combine'] == true) {
			continue;
		}

		if (handle.indexOf(group['filter']) > -1) {
			return group;
		}
	}

	return null;
}

function getProductLimits(handle) {
	var productLimits = limitsJson['productLimits'];
	var productLimit = productLimits[handle];
	return productLimit;
}

function checkItemLimits() {
	var itemsValid = true;

	var products = collectProductQuantities();
	for (product in products) {
		var productDetails = products[product];
		var quantity = Number(productDetails['quantity']);
		var productName = productDetails['title'];

		var limits = getLimitsForItem(product);
		itemsValid = checkProductLimit(quantity, productName, productDetails, Number(limits['min']), Number(limits['max']), Number(limits['multiple'])) && itemsValid;
	}

	return itemsValid;
}

function getLimitsForItem(product) {
	var limits = null;
	var index = product.indexOf(" ");
	var handle = product.substring(0, index);
	var variant = "";
	if(index > 0)
	{
		variant = product.substring(index + 1);
	}
	else
	{
		handle = product;
	}
	var itemmin = Number(limitsJson['itemmin']);
	var itemmax = Number(limitsJson['itemmax']);
	var itemmult = Number(limitsJson['itemmult']);

	limits = getSkuFilter(variant);
	if (limits == null)
		limits = getProductLimits(handle);
	if (limits == null)
		limits = getGroupFilter(handle);
	if (limits == null)
		limits = {
			'min' : itemmin,
			'max' : itemmax,
			'multiple' : itemmult
		};

	return limits;
}

function checkTotalItems() {
	var maxtotalitems = Number(limitsJson['maxtotalitems']);
	var mintotalitems = Number(limitsJson['mintotalitems']);
	var multtotalitems = Number(limitsJson['multtotalitems']);
	var totalItems = 0;
	var totalItemsValid = true;

	var items = cartJson['items'];
	for ( i = 0; i < items.length; i++) {
		var item = items[i];
		var quantity = Number(item['quantity']);
		totalItems += quantity;
	}

	if ((maxtotalitems != 0) && (totalItems > maxtotalitems)) {
		totalItemsValid = false;
		decorateCell(getSubTotalCell(), getMessage("TOTAL_ITEMS_MAX_MSG", {
			"!MAXTOTALITEMS" : maxtotalitems
		}));
	}

	if (totalItems < mintotalitems) {
		totalItemsValid = false;
		decorateCell(getSubTotalCell(), getMessage("TOTAL_ITEMS_MIN_MSG", {
			"!MINTOTALITEMS" : mintotalitems
		}));
	}

	if ((multtotalitems > 1) && (totalItems % multtotalitems > 0)) {
		totalItemsValid = false;
		decorateCell(getSubTotalCell(), getMessage("TOTAL_ITEMS_MULT_MSG", {
			"!MULTTOTALITEMS" : multtotalitems
		}));
	}

	return totalItemsValid;
}

function checkGroupLimits() {
	var groupTotals = [];
	var groupsValid = true;

	var productGroups = limitsJson['groupLimits'];
	for (var i in productGroups) {
		var group = productGroups[i];
		if (group['combine'] == true) {
			var quantity = 0;
			var items = cartJson['items'];
			for (var j in cartJson['items']) {
				var item = items[j];
				if (item['handle'].indexOf(group['filter']) > -1) {
					quantity += item['quantity'];
				}
			}

			var title = unescape(group['title']);

			if (quantity == 0)
				continue;

			if ((group['min'] > 0) && (quantity < group['min'])) {
				groupsValid = false;
				decorateCell(getSubTotalCell(), getMessage("GROUP_MIN_MSG", {
					"!GROUPMIN" : group['min'],
					"!GROUPTITLE" : title
				}));
			}

			if ((group['max'] > 0) && (quantity > group['max'])) {
				groupsValid = false;
				decorateCell(getSubTotalCell(), getMessage("GROUP_MAX_MSG", {
					"!GROUPMAX" : group['max'],
					"!GROUPTITLE" : title
				}));
			}

			if ((group['multiple'] > 1) && (quantity % group['multiple'] > 0)) {
				groupsValid = false;
				decorateCell(getSubTotalCell(), getMessage("GROUP_MULT_MSG", {
					"!GROUPMULT" : group['multiple'],
					"!GROUPTITLE" : title
				}));
			}
		}
	}

	return groupsValid;
}

function checkOverride() {
	var subtotal = getSubtotal();

	var overridesubtotal = Number(limitsJson['overridesubtotal']);

	if ((overridesubtotal > 0) && (subtotal > overridesubtotal)) {
		return true;
	}

	return false;
}

function checkLimits() {
	errorMessage = getMessage("INTRO_MSG", null);
	var checkoutEnabled = true;

	if (!checkOverride()) {
		checkoutEnabled = checkSubTotal();
		checkoutEnabled = checkItemLimits() && checkoutEnabled;
		checkoutEnabled = checkGroupLimits() && checkoutEnabled;
		checkoutEnabled = checkTotalItems() && checkoutEnabled;
		checkoutEnabled = checkWeight() && checkoutEnabled;
	}

	if (checkoutEnabled)
		mmEnableCheckout();
	else
		mmDisableCheckout();

}

function checkCart() {
	$.ajax({
		url : "/cart.js",
		contentType : "text",
		type : "GET",
		cache : false,
		success : function(data) {
			cartJson = JSON.parse(data);
			checkLimits();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.status == "200") {
				cartJson = $.parseJSON(jqXHR.responseText);
				checkLimits();
			}
		}
	});
}

function getLimits() {
	if ($('#minmaxify_disable').length > 0) {
		return;
	}
	if(window.location.href.indexOf("checkout.shopify") != -1) {
		return;
	}

	originalSubmitText = $('[name="checkout"]').val();
	$('[name="checkout"]').removeAttr('disabled');
	$('[name="goto_pp"]').removeAttr('disabled');

	$('[name="checkout"]').click(function() {
		return showMessage();
	});
	$('[name="goto_pp"]').click(function() {
		return showMessage();
	});
	setCheckoutToVerifying();
	//var url = "http://minmaxify.heroku.com/limits.js?callback=?&shop=" + getShopValue();
	var url = "https://s3.amazonaws.com/minmaxify/limits/" + getShopValue() + "?callback=?";
	$.getJSON(url, {
		jsonp : "handleLimits"
	});
}

function handleLimits(data) {
	limitsJson = JSON.parse(data);

	if (limitsJson['lockchange'] == true) {
		setChangeListener();
	}

	checkCart();
	showLimits();
}

function showLimits() {
	var handle = $('#minmaxify-product').text();

	var limits = getLimitsForItem(handle);
	if (limits == null)
		return;

	if ('min' in limits && limits['min'] > 0) {
		$('.minmaxify-min').text(limits['min']);
		$('.minmaxify-min').parent().show();
		$('.minmaxify-minfield').val(limits['min']);
	}
	if ('max' in limits && limits['max'] > 0) {
		$('.minmaxify-max').text(limits['max']);
		$('.minmaxify-max').parent().show();
		$('.minmaxify-maxfield').val(limits['max']);
	}
	if ('multiple' in limits && limits['multiple'] > 0) {
		$('.minmaxify-multiple').text(limits['multiple']);
		$('.minmaxify-multiple').parent().show();
		$('.minmaxify-multfield').val(limits['multiple']);
	}
}

function getShopValue() {
	return Shopify.shop;
}

function onChange() {
	submitText = originalSubmitText;
	var updateText = "Cart needs to be updated";
	updateText = getMessage("CART_UPDATE_MSG", null);

	$('[name="checkout"]').val(updateText);

	errorMessage = getMessage("CART_UPDATE_MSG2", null);
	isValid = false;
}

function setChangeListener() {
	$('input[name^="updates["]').change(function() {
		onChange();
	});
	
	$('.cart-item-decrease').click(function() {
		onChange();
	});
	
	$('.cart-item-increase').click(function() {
		onChange();
	});
	
	$('.js--qty-adjuster').click(function() {
		onChange();
	});
	
	$('.minmaxify-quantity-button').click(function() {
		onChange();
	});
}

getLimits();