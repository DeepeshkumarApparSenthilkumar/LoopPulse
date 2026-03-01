"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var groq_sdk_1 = require("groq-sdk");
var axios_1 = require("axios");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY || 'dummy_string',
});
var isGroqEnabled = !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'dummy_string';
// Real-time weather data fetching
function getWeatherData(location) {
    return __awaiter(this, void 0, void 0, function () {
        var city, weatherApiKey, temp, wind, conditions, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    city = location.includes(',') ? location.split(',')[1].trim() : 'Chicago';
                    weatherApiKey = process.env.WEATHER_API_KEY || 'demo';
                    if (weatherApiKey === 'demo') {
                        temp = Math.floor(Math.random() * 40) + 30;
                        wind = Math.floor(Math.random() * 20) + 5;
                        conditions = ['Clear', 'Cloudy', 'Light Rain', 'Snow'][Math.floor(Math.random() * 4)];
                        return [2 /*return*/, {
                                temp: temp,
                                wind: wind,
                                conditions: conditions,
                                location: city,
                                realDate: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                            }];
                    }
                    return [4 /*yield*/, axios_1.default.get("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(weatherApiKey, "&units=imperial"))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            temp: Math.round(response.data.main.temp),
                            wind: Math.round(response.data.wind.speed),
                            conditions: response.data.weather[0].main,
                            location: city,
                            realDate: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                        }];
                case 2:
                    error_1 = _a.sent();
                    console.error('Weather API error:', error_1);
                    // Fallback to mock data
                    return [2 /*return*/, {
                            temp: 65,
                            wind: 10,
                            conditions: 'Clear',
                            location: 'Chicago',
                            realDate: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Enhanced location data extraction
function getLocationInsights(address) {
    return __awaiter(this, void 0, void 0, function () {
        var chicagoNeighborhoods, ctaLines, detectedNeighborhood, nearestCTA, ridership;
        return __generator(this, function (_a) {
            try {
                chicagoNeighborhoods = ['Loop', 'West Loop', 'Wicker Park', 'Lincoln Park', 'Lakeview', 'River North'];
                ctaLines = ['Red Line', 'Blue Line', 'Brown Line', 'Green Line', 'Orange Line'];
                detectedNeighborhood = chicagoNeighborhoods.find(function (n) {
                    return address.toLowerCase().includes(n.toLowerCase());
                }) || 'Downtown';
                nearestCTA = ctaLines[Math.floor(Math.random() * ctaLines.length)];
                ridership = 85 + Math.floor(Math.random() * 30);
                return [2 /*return*/, {
                        neighborhood: detectedNeighborhood,
                        nearestCTA: nearestCTA,
                        ridership: ridership,
                        station: "".concat(detectedNeighborhood, " Station")
                    }];
            }
            catch (error) {
                console.error('Location insights error:', error);
                return [2 /*return*/, {
                        neighborhood: 'Downtown',
                        nearestCTA: 'Red Line',
                        ridership: 95,
                        station: 'Downtown Station'
                    }];
            }
            return [2 /*return*/];
        });
    });
}
// 1. CHAT ONBOARDING ENDPOINT (Uses Groq LLM)
app.post('/api/extract', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var input, prompt_1, extractionCompletion, extractedData, e_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                input = req.body.input;
                if (!isGroqEnabled) {
                    return [2 /*return*/, res.status(500).json({ reply: "Groq API key missing. Please provide GROQ_API_KEY in .env" })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                prompt_1 = "You are a highly efficient AI taking an unstructured input from a small business owner and extracting it into a structured business profile.\n        User Input: \"".concat(input, "\"\n        \n        Extract the best possible details into a strict JSON object with these keys: name, type, address, staffCount (integer), peakHours, primaryPainPoint.\n        If some details are missing from the input, make highly logical assumptions based on the business type and context (e.g., if they say they are a coffee shop, assume peak hours are morning).\n        Do not wrap in markdown or add text outside the JSON. Return pure JSON only.");
                return [4 /*yield*/, groq.chat.completions.create({
                        messages: [{ role: 'system', content: prompt_1 }],
                        model: "llama-3.3-70b-versatile",
                        temperature: 0.2,
                        response_format: { type: "json_object" }
                    })];
            case 2:
                extractionCompletion = _c.sent();
                extractedData = {};
                try {
                    extractedData = JSON.parse(((_b = (_a = extractionCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '{}');
                }
                catch (e) {
                    console.error("JSON parsing failed, passing soft defaults.");
                    extractedData = { name: "Local Store", type: "Retail", address: "Local City", staffCount: 3, peakHours: "Lunch", primaryPainPoint: "Predicting demand" };
                }
                res.json({
                    extractedData: extractedData,
                    isComplete: true
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _c.sent();
                console.error("Groq extraction error:", e_1);
                res.status(500).json({ error: "Sorry, my AI circuit is overloaded right now." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// 2. DAILY DEMAND PREDICTION (Enhanced with Real-time Data)
app.post('/api/demand', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, _a, weatherData, locationInsights, prompt_2, completion, demand, e_2;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                profile = req.body.profile;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Promise.all([
                        getWeatherData((profile === null || profile === void 0 ? void 0 : profile.address) || 'Chicago, IL'),
                        getLocationInsights((profile === null || profile === void 0 ? void 0 : profile.address) || 'Chicago, IL')
                    ])];
            case 2:
                _a = _d.sent(), weatherData = _a[0], locationInsights = _a[1];
                prompt_2 = "You are a highly analytical AI demand oracle calculating foot traffic with REAL-TIME data.\n        A user has provided this exact business profile:\n        Name: ".concat((profile === null || profile === void 0 ? void 0 : profile.name) || 'Unknown Shop', "\n        Type: ").concat((profile === null || profile === void 0 ? void 0 : profile.type) || 'Unknown Sector', "\n        Address/Location: ").concat((profile === null || profile === void 0 ? void 0 : profile.address) || 'Unknown City', "\n        Current Staff Count: ").concat((profile === null || profile === void 0 ? void 0 : profile.staffCount) || 3, "\n        Expected Peak Hours: ").concat((profile === null || profile === void 0 ? void 0 : profile.peakHours) || 'Unknown', "\n        Pain Point: ").concat((profile === null || profile === void 0 ? void 0 : profile.primaryPainPoint) || 'Unknown', "\n        \n        TODAY'S REAL-TIME DATA:\n        - Date: ").concat(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), "\n        - Weather: ").concat(weatherData.temp, "\u00B0F, ").concat(weatherData.conditions, ", Wind: ").concat(weatherData.wind, "mph\n        - Location: ").concat(weatherData.location, " (").concat(locationInsights.neighborhood, " neighborhood)\n        - Transit: ").concat(locationInsights.nearestCTA, " at ").concat(locationInsights.station, " with ").concat(locationInsights.ridership, "% ridership\n        \n        CRITICAL ANALYSIS REQUIREMENTS:\n        1. WEATHER IMPACT: Analyze how ").concat(weatherData.conditions, " and ").concat(weatherData.temp, "\u00B0F specifically affects ").concat(profile === null || profile === void 0 ? void 0 : profile.type, " businesses\n        2. TRANSIT CORRELATION: Consider how ").concat(locationInsights.nearestCTA, " ridership of ").concat(locationInsights.ridership, "% impacts foot traffic\n        3. NEIGHBORHOOD CONTEXT: Factor in ").concat(locationInsights.neighborhood, " characteristics and typical patterns\n        4. BUSINESS TYPE SPECIFICS: Consider how ").concat(profile === null || profile === void 0 ? void 0 : profile.type, " demand responds to these conditions\n        \n        Calculate a highly accurate demand score (0-100) and tier (SLOW, NORMAL, BUSY, CRITICAL).\n        \n        Respond ONLY with valid JSON matching this exact structure:\n        {\n            \"score\": 45,\n            \"tier\": \"NORMAL\",\n            \"peakHour\": \"Predicted exact peak hour for this type of business\",\n            \"staffRec\": 3,\n            \"insights\": {\n                \"marginOfError\": \"Integer representing +/- % margin of error\",\n                \"dropoffTime\": \"Exact predicted time demand completely falls off\",\n                \"confidenceLevel\": \"Integer 1-100 representing prediction confidence\",\n                \"weatherImpact\": \"Brief explanation of how weather affects demand\",\n                \"transitImpact\": \"Brief explanation of how transit affects demand\"\n            },\n            \"weather\": { \n                \"temp\": ").concat(weatherData.temp, ", \n                \"wind\": ").concat(weatherData.wind, ", \n                \"conditions\": \"").concat(weatherData.conditions, "\",\n                \"realDate\": \"").concat(weatherData.realDate, "\" \n            },\n            \"location\": {\n                \"neighborhood\": \"").concat(locationInsights.neighborhood, "\",\n                \"station\": \"").concat(locationInsights.station, "\"\n            },\n            \"cta\": { \n                \"ridership\": ").concat(locationInsights.ridership, ", \n                \"line\": \"").concat(locationInsights.nearestCTA, "\",\n                \"station\": \"").concat(locationInsights.station, "\" \n            }\n        }");
                return [4 /*yield*/, groq.chat.completions.create({
                        messages: [{ role: 'system', content: prompt_2 }],
                        model: "llama-3.3-70b-versatile",
                        temperature: 0.6,
                        response_format: { type: "json_object" }
                    })];
            case 3:
                completion = _d.sent();
                demand = JSON.parse(((_c = (_b = completion.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || '{}');
                res.json(demand);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _d.sent();
                console.error("Enhanced demand prediction error:", e_2);
                res.status(500).json({ error: "Failed to generate AI demand structure with real-time data." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// 3. MORNING BRIEF GENERATOR (100% AI Driven)
app.post('/api/brief', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, profile, demandData, prompt_3, completion, brief, e_3;
    var _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = req.body, profile = _a.profile, demandData = _a.demandData;
                _h.label = 1;
            case 1:
                _h.trys.push([1, 3, , 4]);
                prompt_3 = "You are a highly intelligent business strategist AI working directly for:\n        Name: \"".concat(profile === null || profile === void 0 ? void 0 : profile.name, "\" (").concat(profile === null || profile === void 0 ? void 0 : profile.type, ") located strategically at ").concat(profile === null || profile === void 0 ? void 0 : profile.address, ".\n        \n        They are facing this highly realistic demand scenario today:\n        - Weather: ").concat((_b = demandData.weather) === null || _b === void 0 ? void 0 : _b.temp, "\u00B0F, Wind: ").concat((_c = demandData.weather) === null || _c === void 0 ? void 0 : _c.wind, "mph\n        - Local Foot/Transit traffic near ").concat((_d = demandData.cta) === null || _d === void 0 ? void 0 : _d.station, ": ").concat((_e = demandData.cta) === null || _e === void 0 ? void 0 : _e.ridership, "%\n        - Today's computed demand score: ").concat(demandData.score, "/100 (").concat(demandData.tier, ")\n        - Their explicitly stated pain point: ").concat(profile === null || profile === void 0 ? void 0 : profile.primaryPainPoint, "\n        \n        Write a hyper-specific morning brief returning ONLY strictly valid JSON matching this exact structure:\n        {\n            \"headline\": \"Short punchy 3-4 word headline tailored to their brand\",\n            \"whyParagraph\": \"1-2 sentences explaining exactly why traffic will be this way using their specific location, product, weather, and transit data provided.\",\n            \"actions\": [\n                \"Action 1 directly solving their specific pain point given today's score\", \n                \"Action 2 on specific staffing adjustments based on their current staff size of ").concat(profile === null || profile === void 0 ? void 0 : profile.staffCount, "\", \n                \"Action 3 on an immediate prep/marketing decision uniquely tailored to their business type\"\n            ],\n            \"outlook\": [\n                { \"day\": \"Day Name Tomorrow\", \"score\": 80, \"trend\": \"up\", \"color\": \"bg-green-500\" },\n                { \"day\": \"Day 3 Name\", \"score\": 40, \"trend\": \"down\", \"color\": \"bg-red-500\" },\n                { \"day\": \"Day 4 Name\", \"score\": 60, \"trend\": \"up\", \"color\": \"bg-blue-500\" }\n            ]\n        }");
                return [4 /*yield*/, groq.chat.completions.create({
                        messages: [{ role: 'system', content: prompt_3 }],
                        model: "llama-3.3-70b-versatile",
                        temperature: 0.5,
                        response_format: { type: "json_object" }
                    })];
            case 2:
                completion = _h.sent();
                brief = JSON.parse(((_g = (_f = completion.choices[0]) === null || _f === void 0 ? void 0 : _f.message) === null || _g === void 0 ? void 0 : _g.content) || '{}');
                res.json(brief);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _h.sent();
                console.error("Groq brief error:", e_3);
                res.status(500).json({ error: "Failed to generate AI brief." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// 4. CHATBOT ORACLE ENDPOINT (Conversational AI with Profile Context)
app.post('/api/chat', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, context, profile, messages, completion, reply, e_4;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, message = _a.message, context = _a.context, profile = _a.profile;
                if (!isGroqEnabled) {
                    return [2 /*return*/, res.status(500).json({ reply: "Groq API key missing. Please provide GROQ_API_KEY in .env" })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                messages = context.map(function (msg) { return ({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }); });
                messages.unshift({
                    role: 'system',
                    content: "You are the LoopPulse AI Oracle, a hyper-local Chicago business strategist. You are advising a Chicago business owner with this profile:\n            Name: ".concat(profile === null || profile === void 0 ? void 0 : profile.name, " (").concat(profile === null || profile === void 0 ? void 0 : profile.type, ")\n            Location: ").concat(profile === null || profile === void 0 ? void 0 : profile.address, "\n            Staff: ").concat(profile === null || profile === void 0 ? void 0 : profile.staffCount, "\n            Pain Point: ").concat(profile === null || profile === void 0 ? void 0 : profile.primaryPainPoint, "\n            \n            CRITICAL DIRECTIVES:\n            1. CHICAGO FOCUS: Always contextualize your advice using real Chicago factors (CTA lines, specific neighborhoods like The Loop, West Loop, or Wicker Park, Lake Michigan weather effects, and Chicago events). Even if their input location is vague, assume Chicago context.\n            2. DEMAND REASONING: Never just give advice. Always explain the concrete \"WHY\" behind your suggestions (e.g., \"Because the Brown Line is experiencing commuter delays...\" or \"Due to the lake effect snow bringing foot traffic down 15%...\").\n            3. Act as a seasoned, practical strategic advisor. Keep responses concise, intelligent, and highly actionable.")
                });
                messages.push({ role: 'user', content: message });
                return [4 /*yield*/, groq.chat.completions.create({
                        messages: messages,
                        model: "llama-3.3-70b-versatile",
                        temperature: 0.7,
                        max_tokens: 300,
                    })];
            case 2:
                completion = _d.sent();
                reply = ((_c = (_b = completion.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || "Connection lost. Please try again.";
                res.json({ reply: reply });
                return [3 /*break*/, 4];
            case 3:
                e_4 = _d.sent();
                console.error("Groq chatbot error:", e_4);
                res.status(500).json({ reply: "Sorry, the Oracle grid is currently overloaded." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// 5. REAL-TIME ALERTS ENDPOINT
app.post('/api/alerts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, _a, weatherData, locationInsights, prompt_4, completion, alerts, e_5;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                profile = req.body.profile;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Promise.all([
                        getWeatherData((profile === null || profile === void 0 ? void 0 : profile.address) || 'Chicago, IL'),
                        getLocationInsights((profile === null || profile === void 0 ? void 0 : profile.address) || 'Chicago, IL')
                    ])];
            case 2:
                _a = _d.sent(), weatherData = _a[0], locationInsights = _a[1];
                prompt_4 = "You are an intelligent alert system monitoring real-time conditions for a business.\n        Business Profile:\n        Name: ".concat((profile === null || profile === void 0 ? void 0 : profile.name) || 'Unknown Shop', "\n        Type: ").concat((profile === null || profile === void 0 ? void 0 : profile.type) || 'Unknown Sector', "\n        Location: ").concat((profile === null || profile === void 0 ? void 0 : profile.address) || 'Unknown City', "\n        Staff: ").concat((profile === null || profile === void 0 ? void 0 : profile.staffCount) || 3, "\n        Pain Point: ").concat((profile === null || profile === void 0 ? void 0 : profile.primaryPainPoint) || 'Unknown', "\n        \n        CURRENT REAL-TIME CONDITIONS:\n        - Weather: ").concat(weatherData.temp, "\u00B0F, ").concat(weatherData.conditions, ", Wind: ").concat(weatherData.wind, "mph\n        - Location: ").concat(locationInsights.neighborhood, " neighborhood\n        - Transit: ").concat(locationInsights.nearestCTA, " at ").concat(locationInsights.station, " with ").concat(locationInsights.ridership, "% ridership\n        \n        Generate 1-3 actionable alerts based on these conditions. Consider:\n        1. Weather impacts on ").concat(profile === null || profile === void 0 ? void 0 : profile.type, " business\n        2. Transit disruptions or opportunities\n        3. Staffing adjustments needed\n        4. Business-specific considerations\n        \n        Respond ONLY with valid JSON matching this structure:\n        {\n            \"alerts\": [\n                {\n                    \"id\": \"alert_1\",\n                    \"type\": \"weather|transit|staffing|opportunity\",\n                    \"severity\": \"low|medium|high|critical\",\n                    \"title\": \"Brief alert title\",\n                    \"message\": \"Detailed explanation of the alert and why it matters\",\n                    \"action\": \"Specific recommended action\",\n                    \"timestamp\": \"").concat(new Date().toISOString(), "\"\n                }\n            ]\n        }");
                return [4 /*yield*/, groq.chat.completions.create({
                        messages: [{ role: 'system', content: prompt_4 }],
                        model: "llama-3.3-70b-versatile",
                        temperature: 0.5,
                        response_format: { type: "json_object" }
                    })];
            case 3:
                completion = _d.sent();
                alerts = JSON.parse(((_c = (_b = completion.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || '{"alerts": []}');
                res.json(alerts);
                return [3 /*break*/, 5];
            case 4:
                e_5 = _d.sent();
                console.error("Real-time alerts error:", e_5);
                res.status(500).json({ error: "Failed to generate real-time alerts." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("LoopPulse Express Backend listening on port ".concat(PORT));
    console.log("Groq API Key active: ".concat(isGroqEnabled));
});
