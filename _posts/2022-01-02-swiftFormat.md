---
title: How to add SwiftFormat to your Xcode project
date: 2022-01-02 16:21:00 +0200
categories: [Tutorial, Swift]
tags: [tutorial,swift,swiftformat,code,formatting,ios,xcode]     # TAG names should always be lowercase
---
## Why automatic code formatting?
- Many programmers have a preferred style for formatting their code, and others seem entirely blind to the existing formatting conventions of a project (to the enragement of their colleagues).
- When collaborating on a project, it can be helpful to agree on a common coding style, but enforcing that manually is tedious and error-prone, and can lead to arguments if some participants take it more seriously than others.
- Having a tool to automatically enforce a common style eliminates those issues and lets you focus on the behaviour of the code, not its presentation.

## Installation using Swift Package Manager and Xcode build phase
*Note: Instructions for Cocoapods and other are available in the [repo](https://github.com/nicklockwood/SwiftFormat#using-cocoapods)*

### Create a `BuildTools` folder & `Package.swift`
1. Create a folder called `BuildTools` in the same folder as your `.xcodeproj` file
2. In this folder, create a file called `Package.swift`, with the following contents:

	```swift
	// swift-tools-version:5.1
	import PackageDescription

	let package = Package(
	    name: "BuildTools",
	    platforms: [.macOS(.v10_11)],
	    dependencies: [
	        .package(url: "https://github.com/nicklockwood/SwiftFormat", from: "0.49.0"),
	    ],
	    targets: [.target(name: "BuildTools", path: "")]
	)
	```

3. If you are running Xcode 11.4 or later, in the BuildTools folder create a file called Empty.swift with nothing in it. This is to satisfy a change in Swift Package Manager.

### Add a Build phases to your app target
1. Click on your project in the file list, choose your target under `TARGETS`, click the `Build Phases` tab
2. Add a new `Run Script` phase by clicking the little plus icon in the top left
3. Drag the new `Run Script` phase above the `Compile Sources` phase, expand it and paste the following script:

	```shell
	# Add here any code that can detect if it is running on CI so that SwiftFormat does not run during CI builds. For CircleCI I use the following:
	# if $CI == true; then
	#     exit 0
	# fi

	# This will not run the SwiftFormat when builds are initiated from SwiftUI Previews. It can be anoing for the code to change while typing. This will not block SwiftFormat when executing user intitiated builds using CMD+B, CMR+R
	if [ "${ENABLE_PREVIEWS}" = "YES" ]; then
	  exit 0;
	fi

	cd BuildTools
	SDKROOT=(xcrun --sdk macosx --show-sdk-path)
	#swift package update #Uncomment this line temporarily to update the version used to the latest matching your BuildTools/Package.swift file
	swift run -c release swiftformat "$SRCROOT"
	```

- You can also use `swift run -c release --package-path BuildTools swiftformat "$SRCROOT"` if you need a more complex script and `cd BuildTools` breaks stuff.
- NOTE: You may wish to check `BuildTools/Package.swift` into your source control so that the version used by your run-script phase is kept in version control. It is recommended to add the following to your `.gitignore` file: `BuildTools/.build` and `BuildTools/.swiftpm`

### Configure SwiftFormat
SwiftFormat's configuration is split between rules and options. Rules are functions in the SwiftFormat library that apply changes to the code. Options are settings that control the behavior of the rules.

SwiftFormat includes over 50 rules, and new ones are added all the time. An up-to-date list can be found in [Rules](https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md) along with documentation on how they are used.

Rules can be either enabled or disabled. Most are enabled by **default**. Disabled rules are marked with "(disabled)" in the docs.

1. Create a file named `config.swiftformat` in the source root folder of your project. Here we will put all the rules that we want to enable or disable.
2. In the `Run Script` created above, append to the last line the configurations so that the SwiftFormat knows how to behave. It should look like this now:
`swift run -c release swiftformat "$SRCROOT" --config "$SRCROOT/config.swiftformat"`

- As a starting point you can use my configuration file but you can find all possible configurations in the [repo with very detailed explanations](https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md).
- Just paste the following in `config.swiftformat`

	*In each line I have added a link to the detailed explanation for the rules*

	```shell
	# format options
	--allman false # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#braces
	--indent 4 # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#indent
	--header strip # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#fileheader
	--self init-only # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#redundantself
	--wraparguments before-first # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wraparguments
	--wrapparameters before-first # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wraparguments
	--wrapcollections before-first # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wraparguments
	--wrapreturntype if-multiline # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wraparguments
	--wrapconditions before-first # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wraparguments
	--funcattributes prev-line # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wrapattributes
	--typeattributes prev-line # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wrapattributes
	--varattributes same-line # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#wrapattributes
	--marktypes never # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#markTypes

	# file options
	--swiftversion 5.3 # this is used to specify the swift version so that the rules behave acordingly for that version of swift
	# --exclude Pods,"**/API.swift",BuildTools # exclude code that is autogenerated from other tools or third party dependencies

	# rules
	--disable preferKeyPath # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#preferKeyPath
	--disable initCoderUnavailable # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#initCoderUnavailable
	--enable markTypes # https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md#markTypes
	```

- To set a specific option for a rule (if it is different from the default one) just state the rule and the option after it with a space. Ex: `--indent 4` this will set indentation to 4 spaces and can be changed to whatever value, or set it like `--indent tab` to use tabs instead of space.
- To disable a rule that is enabled by default just type `--disable preferKeyPath`. This will disable the `preferKeyPath` rule.
- To enable a rule that is disable by default just type `--enable markTypes`. This will enable the `markTypes` rule
- To exclude files from the formatter altogether, like the whole `Pods` folder, just type `--exclude Pods`. you can add more paths separated by comma to the same line like this `--exclude Pods,"**/API.swift",BuildTools`
- To avoid automatically opting-in to new rules when SwiftFormat is updated, use the--rules argument to __only__ enable the rules you specify `--rules indent,linebreaks`
- Hit build and you should see the code change immediately. It may take a few seconds the first time but it is super fast thereafter since it only runs on files that have changes in git.

## Example
Before

```swift
func someFunction(param1: String  , param2 : Int   ,
       param3: AnyObject
)

   {
    [1 ... param2].forEach(  { val in
           print  ( val)
    } )       
       return
}
```

After

```swift
func someFunction(
    param1 _: String,
    param2: Int,
    param3 _: AnyObject
) {
    [1 ... param2].forEach { val in
        print(val)
    }
}
```
